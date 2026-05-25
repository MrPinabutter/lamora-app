import { z } from "zod";

// Mesmos campos de identidade do cadastro (`signup.schema.ts`) que o usuário
// pode editar depois — a senha é tratada em fluxo separado (não no MVP).
export const profileSchema = z.object({
  email: z.string().email("E-mail inválido"),
  birthDate: z.coerce
    .date({ invalid_type_error: "Data inválida" })
    .max(new Date(), "Data no futuro"),
  phone: z
    .string()
    .regex(/^\d{10,11}$/, "Telefone com DDD (10 ou 11 dígitos)"),
});

export type ProfileInput = z.infer<typeof profileSchema>;
