import type { Metadata } from "next";
import Link from "next/link";
import { SignupForm } from "@/features/auth";
import { Text } from "@/shared/components/atoms/Text";

export const metadata: Metadata = {
  title: "Criar conta — Lamora",
  description: "Cadastre-se para acompanhar lançamentos e finalizar pedidos.",
};

export default function SignupPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <Text variant="eyebrow">Cadastro</Text>
        <Text variant="h1" className="text-2xl lg:text-[1.75rem]">
          Crie sua conta
        </Text>
      </header>

      <SignupForm />

      <Text variant="caption" as="p" className="text-center">
        Já tem conta?{" "}
        <Link
          href="/login"
          className="text-foreground hover:text-accent rounded-sm underline underline-offset-4 transition-colors"
        >
          Entrar
        </Link>
      </Text>
    </div>
  );
}
