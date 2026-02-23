import { RequestHandler } from "express"
import { authSignInSchema } from "../schemas/auth-signin"
import { getUserByEmail } from "../services/user/user"
import { generateOTP } from "../services/otp/otp"

export const signIn: RequestHandler = async (req, res) => {
  const data = authSignInSchema.safeParse(req.body)

  if (!data.success) {
    res.json({ error: data.error.flatten().fieldErrors })

    return
  }

  const user = await getUserByEmail(data.data.email)

  if (!user) {
    res.json({ error: "E-mail ou senha inválidos" })
    return
  }

  const otp = await generateOTP(user.id)

  res.json({ message: "OTP enviado para o e-mail cadastrado" })
}
