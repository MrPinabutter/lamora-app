import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DeleteAccountDialog, ProfileForm } from "@/features/profile";
import { getProfile } from "@/features/profile/services/profile.service";
import { Text } from "@/shared/components/atoms/Text";
import { readSession } from "@/server/auth/session";

export const metadata: Metadata = {
  title: "Meu perfil — Lamora",
  description: "Edite seus dados de cadastro ou exclua sua conta.",
};

export const dynamic = "force-dynamic";

function formatBirthDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export default async function PerfilPage() {
  const session = await readSession();
  if (!session) redirect("/login");

  const profile = await getProfile(session.userId);
  if (!profile) redirect("/login");

  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-12 lg:py-20">
      <header className="space-y-3">
        <Text variant="eyebrow">Conta</Text>
        <Text variant="h1" className="text-2xl lg:text-[1.75rem]">
          Meu perfil
        </Text>
        <Text variant="caption" as="p">
          Atualize suas informações de contato ou exclua a conta a qualquer
          momento.
        </Text>
      </header>

      <section className="mt-10">
        <ProfileForm
          defaults={{
            email: profile.email,
            birthDate: formatBirthDate(profile.birthDate),
            phone: profile.phone,
          }}
        />
      </section>

      <section className="border-border mt-16 border-t pt-8">
        <div className="space-y-3">
          <Text variant="eyebrow">Zona sensível</Text>
          <Text variant="body" tone="muted" as="p">
            Ao excluir, seus dados pessoais são anonimizados de forma
            irreversível e o acesso à conta é encerrado.
          </Text>
        </div>
        <div className="mt-5">
          <DeleteAccountDialog />
        </div>
      </section>
    </main>
  );
}
