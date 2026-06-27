import Link from "next/link";
import { User } from "lucide-react";
import { readSession } from "@/server/auth/session";
import { Text } from "@/shared/components/atoms/Text";

export async function UserButton() {
  const session = await readSession();

  if (session) {
    return (
      <Link
        href="/perfil"
        aria-label="Meu perfil"
        className="text-foreground hover:text-accent focus-visible:ring-primary inline-flex size-9 items-center justify-center rounded-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
      >
        <User className="size-4" aria-hidden />
      </Link>
    );
  }

  return (
    <Link
      href="/login"
      className="focus-visible:ring-primary group inline-flex rounded-sm py-1 focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
    >
      <Text
        variant="eyebrow"
        as="span"
        className="text-muted transition-colors group-hover:text-foreground"
      >
        Entrar
      </Text>
    </Link>
  );
}
