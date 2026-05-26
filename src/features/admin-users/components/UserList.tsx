import { Text } from "@/shared/components/atoms/Text";
import { cn, formatBRL } from "@/shared/lib/utils";
import type {
  AdminUserRow,
  AdminUserStatus,
} from "../services/admin-user.service";

const DATE_FMT = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const STATUS_LABEL: Record<AdminUserStatus, string> = {
  ACTIVE: "Ativo",
  ANONYMIZED: "Anonimizado",
};

const STATUS_CLASS: Record<AdminUserStatus, string> = {
  ACTIVE: "bg-accent/10 text-accent",
  ANONYMIZED: "bg-border text-muted",
};

interface UserListProps {
  users: AdminUserRow[];
}

export function UserList({ users }: UserListProps) {
  if (users.length === 0) {
    return (
      <div className="border-border rounded-md border border-dashed p-12 text-center">
        <Text variant="eyebrow">Sem usuários</Text>
        <Text variant="caption" as="p" className="mt-2">
          Nenhum cadastro registrado até agora.
        </Text>
      </div>
    );
  }

  return (
    <ul className="border-border divide-border divide-y rounded-md border">
      {users.map((user) => (
        <li key={user.id} className="px-4 py-5 sm:px-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <Text
                  variant="h3"
                  as="p"
                  className="truncate font-serif text-[15px] font-normal"
                >
                  {user.email}
                </Text>
                {user.isAdmin ? (
                  <span className="bg-foreground/5 text-foreground/70 rounded-full px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase">
                    Admin
                  </span>
                ) : null}
              </div>
              <Text variant="caption" as="p" className="mt-1">
                Cadastrado em {DATE_FMT.format(user.createdAt)}
              </Text>
            </div>
            <span
              className={cn(
                "rounded-full px-3 py-1 text-[11px] font-medium tracking-wide uppercase",
                STATUS_CLASS[user.status],
              )}
            >
              {STATUS_LABEL[user.status]}
            </span>
            <div className="text-right">
              <Text variant="caption" as="p" className="text-foreground">
                {user.cart.itemCount > 0
                  ? `${user.cart.itemCount} item(ns) · ${formatBRL(user.cart.total)}`
                  : "Carrinho vazio"}
              </Text>
              {user.cart.updatedAt ? (
                <Text variant="caption" as="p">
                  Atualizado em {DATE_FMT.format(user.cart.updatedAt)}
                </Text>
              ) : null}
            </div>
          </div>

          {user.cart.lines.length > 0 ? (
            <details className="border-border mt-4 rounded-md border">
              <summary className="text-foreground cursor-pointer px-4 py-2 text-sm select-none">
                Ver carrinho
              </summary>
              <ul className="divide-border divide-y">
                {user.cart.lines.map((line) => (
                  <li
                    key={line.productId}
                    className="flex items-center justify-between gap-4 px-4 py-2 text-sm"
                  >
                    <div className="min-w-0">
                      <Text
                        variant="body"
                        as="p"
                        className="truncate text-foreground"
                      >
                        {line.quantity}× {line.name}
                      </Text>
                      <Text variant="caption" as="p">
                        {line.brand}
                      </Text>
                    </div>
                    <Text variant="caption" as="span" className="tabular-nums">
                      {formatBRL(line.price * line.quantity)}
                    </Text>
                  </li>
                ))}
              </ul>
            </details>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
