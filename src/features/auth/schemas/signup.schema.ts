import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(8, "Mínimo de 8 caracteres"),
  birthDate: z.coerce
    .date({ invalid_type_error: "Data inválida" })
    .max(new Date(), "Data no futuro"),
  phone: z
    .string()
    .regex(/^\d{10,11}$/, "Telefone com DDD (10 ou 11 dígitos)"),
  // LGPD: consentimento obrigatório e explícito (`project.md`/`spec.md §6`).
  // Sem aceite, o cadastro é rejeitado tanto no cliente quanto no servidor.
  lgpdConsent: z.literal(true, {
    errorMap: () => ({ message: "É necessário aceitar os termos" }),
  }),
});

export type SignupInput = z.infer<typeof signupSchema>;
