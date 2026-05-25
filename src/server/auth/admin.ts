import "server-only";
import { db } from "@/server/db";
import { readSession } from "./session";

export interface AdminUser {
  id: string;
  email: string;
}

// Resolve o usuário admin da sessão atual; retorna `null` para qualquer caso
// que não autoriza acesso ao painel (sem sessão, conta anonimizada, sem flag
// `isAdmin`). Layout de `/admin` redireciona com base nesse retorno.
export async function getCurrentAdmin(): Promise<AdminUser | null> {
  const session = await readSession();
  if (!session) return null;

  const row = await db.user.findUnique({
    where: { id: session.userId },
    select: { id: true, email: true, status: true, isAdmin: true },
  });
  if (!row || row.status !== "ACTIVE" || !row.isAdmin) return null;

  return { id: row.id, email: row.email };
}
