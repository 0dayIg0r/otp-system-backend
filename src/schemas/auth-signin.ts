import { z } from "zod";

export const authSignInSchema = z.object({
  email: z.string({message: "E-mail é obrigatório"}).trim().pipe(z.email({ error: "E-mail inválido" })),
});