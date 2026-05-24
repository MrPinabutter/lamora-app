import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/features/auth";
import { Text } from "@/shared/components/atoms/Text";

export const metadata: Metadata = {
  title: "Entrar — Lamora",
  description: "Acesse sua conta Lamora.",
};

export default function LoginPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <Text variant="eyebrow">Acesso</Text>
        <Text variant="h1" className="text-2xl lg:text-[1.75rem]">
          Entrar
        </Text>
      </header>

      <LoginForm />

      <Text variant="caption" as="p" className="text-center">
        Ainda não tem conta?{" "}
        <Link
          href="/cadastro"
          className="text-foreground hover:text-accent rounded-sm underline underline-offset-4 transition-colors"
        >
          Criar conta
        </Link>
      </Text>
    </div>
  );
}
