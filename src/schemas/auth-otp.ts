import z from "zod";


export const authVerifyOTPSchema = z.object({
  id: z.number({ message: "ID do usuário é obrigatório" }),
  code: z.string().min(11, { message: "Código inválido" }).max(11, { message: "Código inválido" }),
});