import { z } from "zod";

export const authVerifyOTPSchema = z.object({
  id: z.coerce.number().int().positive({ message: "ID é obrigatório" }),
  code: z.string().regex(/^\d{6}$/, { message: "Código inválido" }),
});