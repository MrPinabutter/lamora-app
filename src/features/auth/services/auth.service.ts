import "server-only";
import { db } from "@/server/db";
import { hashPassword, verifyPassword } from "../lib/password";
import type { SignupInput } from "../schemas/signup.schema";

export interface AuthUser {
  id: string;
  email: string;
}

export type CreateUserResult =
  | { ok: true; user: AuthUser }
  | { ok: false; reason: "email-taken" };

export async function createUser(
  input: SignupInput,
): Promise<CreateUserResult> {
  const existing = await db.user.findUnique({
    where: { email: input.email },
    select: { id: true },
  });
  if (existing) return { ok: false, reason: "email-taken" };

  const password = await hashPassword(input.password);

  const user = await db.user.create({
    data: {
      email: input.email,
      password,
      birthDate: input.birthDate,
      phone: input.phone,
      lgpdConsent: input.lgpdConsent,
      // Registra o momento exato do consentimento (LGPD).
      consentAt: new Date(),
    },
    select: { id: true, email: true },
  });

  return { ok: true, user };
}

export async function verifyCredentials(
  email: string,
  password: string,
): Promise<AuthUser | null> {
  const row = await db.user.findUnique({
    where: { email },
    select: { id: true, email: true, password: true, status: true },
  });
  if (!row || row.status !== "ACTIVE") return null;

  const ok = await verifyPassword(password, row.password);
  return ok ? { id: row.id, email: row.email } : null;
}
