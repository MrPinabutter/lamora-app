import type { Metadata } from "next";
import {
  BarChart,
  MetricCard,
  OlfactoryChart,
  type BarChartPoint,
} from "@/features/admin-dashboard";
import {
  getMetricSummary,
  getOlfactoryRanking,
  getSignupsByWeek,
  getTopCartProducts,
} from "@/features/admin-dashboard/services/analytics.service";
import { Text } from "@/shared/components/atoms/Text";

export const metadata: Metadata = {
  title: "Dashboard — Admin Lamora",
};

export const dynamic = "force-dynamic";

const SHORT_DATE = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  timeZone: "UTC",
});

function toBarChartSignups(
  rows: Awaited<ReturnType<typeof getSignupsByWeek>>,
): BarChartPoint[] {
  return rows.map((row) => ({
    label: SHORT_DATE.format(row.weekStart),
    value: row.count,
  }));
}

function toBarChartProducts(
  rows: Awaited<ReturnType<typeof getTopCartProducts>>,
): BarChartPoint[] {
  return rows.map((row) => ({
    label: row.name,
    value: row.count,
    display: `${row.count} · ${row.brand}`,
  }));
}

export default async function AdminDashboardPage() {
  const [summary, signupsByWeek, topProducts, olfactoryRanking] =
    await Promise.all([
      getMetricSummary(),
      getSignupsByWeek(8),
      getTopCartProducts(5),
      getOlfactoryRanking(8),
    ]);

  return (
    <div className="space-y-12">
      <header className="space-y-2">
        <Text variant="eyebrow">Painel</Text>
        <Text variant="h1" className="text-2xl lg:text-[1.75rem]">
          Dashboard
        </Text>
        <Text variant="caption" as="p">
          Métricas de conversão a partir dos eventos registrados. Os contadores
          começam em zero até a Tarefa 10 instrumentar sessões, cliques e
          envios.
        </Text>
      </header>

      <section
        aria-label="Visão geral"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <MetricCard
          label="Visitas (sessões únicas)"
          value={summary.uniqueSessions}
          description="Distintos `sessionId` em eventos SESSION."
        />
        <MetricCard
          label="Contas ativas"
          value={summary.accountsTotal}
          description="Usuários com status ACTIVE."
        />
        <MetricCard
          label="Itens no carrinho"
          value={summary.cartAddsTotal}
          description="Total de eventos CART_ADD."
        />
        <MetricCard
          label="Envios WhatsApp"
          value={summary.whatsappSendsTotal}
          description="Conversões — eventos WHATSAPP_SEND."
        />
      </section>

      <section className="border-border bg-surface rounded-md border p-6">
        <header className="mb-6 flex items-baseline justify-between gap-4">
          <div className="space-y-1">
            <Text variant="eyebrow">Cadastros por semana</Text>
            <Text variant="caption" as="p">
              Últimas 8 semanas, segunda a domingo (UTC).
            </Text>
          </div>
          <Text variant="caption" as="span" className="tabular-nums">
            Total {signupsByWeek.reduce((acc, row) => acc + row.count, 0)}
          </Text>
        </header>
        <BarChart data={toBarChartSignups(signupsByWeek)} />
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="border-border bg-surface rounded-md border p-6">
          <header className="mb-6 space-y-1">
            <Text variant="eyebrow">Mais adicionados ao carrinho</Text>
            <Text variant="caption" as="p">
              Top 5 produtos por eventos CART_ADD.
            </Text>
          </header>
          <BarChart
            data={toBarChartProducts(topProducts)}
            orientation="horizontal"
            emptyMessage="Nenhum produto adicionado ainda."
          />
        </div>
        <div className="border-border bg-surface rounded-md border p-6">
          <header className="mb-6 space-y-1">
            <Text variant="eyebrow">Notas olfativas predominantes</Text>
            <Text variant="caption" as="p">
              Pondera intensidade pelas adições ao carrinho; cai no catálogo
              quando não há eventos.
            </Text>
          </header>
          <OlfactoryChart notes={olfactoryRanking} />
        </div>
      </section>
    </div>
  );
}
