"use server";

import { redirect } from "next/navigation";
import {
  createUser,
  verifyCredentials,
} from "@/features/auth/services/auth.service";
import { loginSchema } from "@/features/auth/schemas/login.schema";
import { signupSchema } from "@/features/auth/schemas/signup.schema";
import {
  createSession,
  destroySession,
} from "@/server/auth/session";

export type ActionError = {
  ok: false;
  formError?: string;
  fieldErrors?: Partial<Record<string, string[]>>;
};

export async function signupAction(
  rawInput: unknown,
): Promise<ActionError | void> {
  const parsed = signupSchema.safeParse(rawInput);
  if (!parsed.success) {
    return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const result = await createUser(parsed.data);
  if (!result.ok) {
    return {
      ok: false,
      fieldErrors: { email: ["E-mail já cadastrado"] },
    };
  }

  await createSession(result.user.id);
  redirect("/");
}

export async function loginAction(
  rawInput: unknown,
): Promise<ActionError | void> {
  const parsed = loginSchema.safeParse(rawInput);
  if (!parsed.success) {
    return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const user = await verifyCredentials(parsed.data.email, parsed.data.password);
  if (!user) {
    return { ok: false, formError: "E-mail ou senha incorretos." };
  }

  await createSession(user.id);
  redirect("/");
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/");
}
