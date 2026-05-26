import type { Metadata } from "next";
import { UserList } from "@/features/admin-users";
import { listAdminUsers } from "@/features/admin-users/services/admin-user.service";
import { Text } from "@/shared/components/atoms/Text";

export const metadata: Metadata = {
  title: "Usuários — Admin Lamora",
};

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const users = await listAdminUsers();

  const activeCount = users.filter((user) => user.status === "ACTIVE").length;
  const anonymizedCount = users.length - activeCount;

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <Text variant="eyebrow">Conta</Text>
        <Text variant="h1" className="text-2xl lg:text-[1.75rem]">
          Usuários
        </Text>
        <Text variant="caption" as="p">
          Visão somente leitura · {activeCount} ativo(s) · {anonymizedCount}{" "}
          anonimizado(s). Contas anonimizadas (LGPD) mantêm o registro com
          placeholder no e-mail e sem dados pessoais reversíveis.
        </Text>
      </header>
      <UserList users={users} />
    </div>
  );
}
