"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { profileSchema } from "@/features/profile/schemas/profile.schema";
import {
  anonymizeUser,
  updateProfile,
} from "@/features/profile/services/profile.service";
import { destroySession, readSession } from "@/server/auth/session";

export type ProfileActionResult =
  | { ok: true }
  | {
      ok: false;
      formError?: string;
      fieldErrors?: Partial<Record<string, string[]>>;
    };

export async function updateProfileAction(
  rawInput: unknown,
): Promise<ProfileActionResult> {
  const session = await readSession();
  if (!session) {
    return { ok: false, formError: "Sessão expirada. Entre novamente." };
  }

  const parsed = profileSchema.safeParse(rawInput);
  if (!parsed.success) {
    return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const result = await updateProfile(session.userId, parsed.data);
  if (!result.ok) {
    if (result.reason === "email-taken") {
      return { ok: false, fieldErrors: { email: ["E-mail já em uso"] } };
    }
    return { ok: false, formError: "Não foi possível atualizar o perfil." };
  }

  revalidatePath("/perfil");
  return { ok: true };
}

export async function deleteAccountAction(): Promise<void> {
  const session = await readSession();
  if (!session) redirect("/login");

  await anonymizeUser(session.userId);
  await destroySession();
  redirect("/");
}
