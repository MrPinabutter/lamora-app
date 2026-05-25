import "server-only";
import { db } from "@/server/db";
import { ANALYTICS_EVENT } from "@/shared/lib/constants";

export interface MetricSummary {
  uniqueSessions: number;
  accountsTotal: number;
  cartAddsTotal: number;
  whatsappSendsTotal: number;
}

export interface SignupsByWeekPoint {
  /** Segunda-feira 00:00 UTC do início da semana. */
  weekStart: Date;
  count: number;
}

export interface TopProduct {
  productId: string;
  name: string;
  brand: string;
  count: number;
}

export interface OlfactoryRank {
  name: string;
  tier: "TOPO" | "CORACAO" | "FUNDO";
  /** Peso agregado (eventos x intensidade ou contagem absoluta no fallback). */
  count: number;
}

function startOfIsoWeekUTC(input: Date): Date {
  const utcDate = new Date(
    Date.UTC(input.getUTCFullYear(), input.getUTCMonth(), input.getUTCDate()),
  );
  // ISO: segunda-feira = início da semana.
  const dayOfWeek = utcDate.getUTCDay();
  const mondayOffset = (dayOfWeek + 6) % 7;
  utcDate.setUTCDate(utcDate.getUTCDate() - mondayOffset);
  return utcDate;
}

export async function getMetricSummary(): Promise<MetricSummary> {
  // SESSION é dedup por `metadata->>'sessionId'`. Antes da Tarefa 10
  // instrumentar isso o valor fica em 0 — é o esperado.
  const sessions = await db.$queryRaw<Array<{ count: bigint }>>`
    SELECT COUNT(DISTINCT metadata->>'sessionId')::bigint AS count
    FROM "AnalyticsEvent"
    WHERE type = ${ANALYTICS_EVENT.SESSION}
  `;

  const [accountsTotal, cartAddsTotal, whatsappSendsTotal] = await Promise.all([
    db.user.count({ where: { status: "ACTIVE" } }),
    db.analyticsEvent.count({ where: { type: ANALYTICS_EVENT.CART_ADD } }),
    db.analyticsEvent.count({
      where: { type: ANALYTICS_EVENT.WHATSAPP_SEND },
    }),
  ]);

  return {
    uniqueSessions: Number(sessions[0]?.count ?? 0),
    accountsTotal,
    cartAddsTotal,
    whatsappSendsTotal,
  };
}

export async function getSignupsByWeek(
  weeks = 8,
): Promise<SignupsByWeekPoint[]> {
  if (weeks <= 0) return [];

  const currentWeekStart = startOfIsoWeekUTC(new Date());
  const earliestWeekStart = new Date(currentWeekStart);
  earliestWeekStart.setUTCDate(
    earliestWeekStart.getUTCDate() - (weeks - 1) * 7,
  );

  const users = await db.user.findMany({
    where: { createdAt: { gte: earliestWeekStart } },
    select: { createdAt: true },
  });

  const buckets = new Map<number, number>();
  for (let i = 0; i < weeks; i++) {
    const day = new Date(earliestWeekStart);
    day.setUTCDate(day.getUTCDate() + i * 7);
    buckets.set(day.getTime(), 0);
  }

  for (const user of users) {
    const weekKey = startOfIsoWeekUTC(user.createdAt).getTime();
    if (buckets.has(weekKey)) {
      buckets.set(weekKey, (buckets.get(weekKey) ?? 0) + 1);
    }
  }

  return Array.from(buckets.entries())
    .sort(([a], [b]) => a - b)
    .map(([time, count]) => ({ weekStart: new Date(time), count }));
}

export async function getTopCartProducts(limit = 5): Promise<TopProduct[]> {
  const rows = await db.$queryRaw<
    Array<{ product_id: string; count: bigint }>
  >`
    SELECT metadata->>'productId' AS product_id, COUNT(*)::bigint AS count
    FROM "AnalyticsEvent"
    WHERE type = ${ANALYTICS_EVENT.CART_ADD}
      AND metadata->>'productId' IS NOT NULL
    GROUP BY product_id
    ORDER BY count DESC
    LIMIT ${limit}
  `;

  if (rows.length === 0) return [];

  const ids = rows.map((row) => row.product_id);
  const products = await db.product.findMany({
    where: { id: { in: ids } },
    select: { id: true, name: true, brand: true },
  });
  const productMap = new Map(products.map((p) => [p.id, p]));

  return rows
    .map((row) => {
      const product = productMap.get(row.product_id);
      if (!product) return null;
      return {
        productId: product.id,
        name: product.name,
        brand: product.brand,
        count: Number(row.count),
      };
    })
    .filter((row): row is TopProduct => row !== null);
}

export async function getOlfactoryRanking(
  limit = 8,
): Promise<OlfactoryRank[]> {
  // Pondera as notas pelos produtos efetivamente adicionados ao carrinho.
  // Antes da Tarefa 10 (sem eventos) caímos no fallback de contagem absoluta
  // de notas no catálogo, para o gráfico não ficar vazio.
  const cartRows = await db.$queryRaw<
    Array<{ product_id: string; weight: bigint }>
  >`
    SELECT metadata->>'productId' AS product_id, COUNT(*)::bigint AS weight
    FROM "AnalyticsEvent"
    WHERE type = ${ANALYTICS_EVENT.CART_ADD}
      AND metadata->>'productId' IS NOT NULL
    GROUP BY product_id
  `;

  if (cartRows.length > 0) {
    const ids = cartRows.map((row) => row.product_id);
    const productsWithNotes = await db.product.findMany({
      where: { id: { in: ids }, category: "PERFUME" },
      select: {
        id: true,
        olfactory: { select: { name: true, tier: true, intensity: true } },
      },
    });

    const weights = new Map(
      cartRows.map((row) => [row.product_id, Number(row.weight)]),
    );
    const ranking = new Map<string, OlfactoryRank>();

    for (const product of productsWithNotes) {
      const weight = weights.get(product.id) ?? 0;
      for (const note of product.olfactory) {
        const key = `${note.name}|${note.tier}`;
        const current = ranking.get(key);
        const delta = weight * note.intensity;
        if (current) {
          current.count += delta;
        } else {
          ranking.set(key, { name: note.name, tier: note.tier, count: delta });
        }
      }
    }

    return Array.from(ranking.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }

  const fallback = await db.$queryRaw<
    Array<{ name: string; tier: "TOPO" | "CORACAO" | "FUNDO"; count: bigint }>
  >`
    SELECT name, tier, COUNT(*)::bigint AS count
    FROM "OlfactoryNote"
    GROUP BY name, tier
    ORDER BY count DESC
    LIMIT ${limit}
  `;

  return fallback.map((row) => ({
    name: row.name,
    tier: row.tier,
    count: Number(row.count),
  }));
}
