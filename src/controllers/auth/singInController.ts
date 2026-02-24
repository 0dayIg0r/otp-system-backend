import { RequestHandler } from "express"
import { authSignInSchema } from "../../schemas/auth-signin"
import { getUserByEmail } from "../../services/user/getUserService.ts"

import { sendEmail } from "../../libs/mailtrap"
import { generateOTP } from "../../services/auth/generateOtpService.ts"

export const signIn: RequestHandler = async (req, res) => {
  const data = authSignInSchema.safeParse(req.body)

  if (!data.success) {
    res.json({ error: data.error.flatten().fieldErrors })

    return
  }

  const user = await getUserByEmail(data.data.email)

  if (!user) {
    res.json({ error: "E-mail inválido" })
    return
  }

  const otp = await generateOTP(user.id, user.email)

  await sendEmail(
    user.email,
    "Seu código de acesso",
    `Olá! Seu código de acesso é: ${otp.code}. Ele é válido por 30 minutos.`,
  )

  res.json({ id: otp.id })
}

export function signUp(arg0: string, signUp: any) {
  throw new Error("Function not implemented.")
}
