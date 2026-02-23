import z from "zod";

export const authSignUpSchema = z.object({
  email: z.email({ message: "Digite um e-mail válido" }),
  name: z.string().min(3, {message: 'Digite um nome válido'}),
});