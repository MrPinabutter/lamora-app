import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { db } from "@/server/db";
import type { ProfileInput } from "../schemas/profile.schema";

export interface ProfileSummary {
  id: string;
  email: string;
  birthDate: Date;
  phone: string;
  createdAt: Date;
}

export type UpdateProfileResult =
  | { ok: true; profile: ProfileSummary }
  | { ok: false; reason: "email-taken" | "not-found" };

export async function getProfile(
  userId: string,
): Promise<ProfileSummary | null> {
  const row = await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      birthDate: true,
      phone: true,
      createdAt: true,
      status: true,
    },
  });
  if (!row || row.status !== "ACTIVE") return null;
  return {
    id: row.id,
    email: row.email,
    birthDate: row.birthDate,
    phone: row.phone,
    createdAt: row.createdAt,
  };
}

export async function updateProfile(
  userId: string,
  data: ProfileInput,
): Promise<UpdateProfileResult> {
  const existing = await db.user.findUnique({
    where: { id: userId },
    select: { status: true },
  });
  if (!existing || existing.status !== "ACTIVE") {
    return { ok: false, reason: "not-found" };
  }

  const conflict = await db.user.findFirst({
    where: { email: data.email, NOT: { id: userId } },
    select: { id: true },
  });
  if (conflict) return { ok: false, reason: "email-taken" };

  const row = await db.user.update({
    where: { id: userId },
    data: {
      email: data.email,
      birthDate: data.birthDate,
      phone: data.phone,
    },
    select: {
      id: true,
      email: true,
      birthDate: true,
      phone: true,
      createdAt: true,
    },
  });
  return { ok: true, profile: row };
}

// LGPD — exclusão com anonimização (spec.md §6 + tarefa 06).
// Mantém a linha do `User` (para integridade futura) mas remove qualquer
// PII reversível: `status` -> ANONYMIZED, e-mail/telefone sobrescritos por
// valores irreversíveis e senha zerada para impedir login.
export async function anonymizeUser(userId: string): Promise<void> {
  const noise = randomBytes(16).toString("hex");
  const fingerprint = createHash("sha256")
    .update(`${userId}.${noise}`)
    .digest("hex")
    .slice(0, 24);

  await db.user.update({
    where: { id: userId },
    data: {
      status: "ANONYMIZED",
      email: `anon-${fingerprint}@deleted.lamora.local`,
      phone: "",
      password: "",
    },
  });
}
