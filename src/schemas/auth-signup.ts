import z from "zod";

export const authSignUpSchema = z.object({
  email: z.string({message: 'Digite seu e-mail'}).email({message: 'E-mail inválido'}),
  name: z.string().min(3, {message: 'Digite um nome válido'}),
});