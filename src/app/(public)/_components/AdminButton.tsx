import Link from "next/link";
import { getCurrentAdmin } from "@/server/auth/admin";
import { Text } from "@/shared/components/atoms/Text";

/** Atalho para o painel, visível apenas para usuários admin. */
export async function AdminButton() {
  const admin = await getCurrentAdmin();
  if (!admin) return null;

  return (
    <Link
      href="/admin"
      className="focus-visible:ring-primary group inline-flex rounded-sm py-1 focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
    >
      <Text
        variant="eyebrow"
        as="span"
        className="text-muted transition-colors group-hover:text-foreground"
      >
        Admin
      </Text>
    </Link>
  );
}
