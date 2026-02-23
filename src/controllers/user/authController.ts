import { RequestHandler } from "express"
import { authSignInSchema } from "../../schemas/auth-signin"
import { createUser, getUserByEmail } from "../../services/user/userService"
import { generateOTP, validateOTP } from "../../services/otp/otp"
import { sendEmail } from "../../libs/mailtrap"
import { authSignUpSchema } from "../../schemas/auth-signup"
import { authVerifyOTPSchema } from "../../schemas/auth-otp"
import { createJWT } from "../../libs/jwt"

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

//Lembrar de componetizar a validação do schema, para não repetir o código
export const signUp: RequestHandler = async (req, res) => {
  const data = authSignUpSchema.safeParse(req.body)

  if (!data.success) {
    res.status(400).json({
      error: "Preencha todos os campos corretamente",
    })
    return
  }
  //lembrar de componentizar a busca do usuário por email, para não repetir o código
  const user = await getUserByEmail(data.data.email)

  if (user) {
    res.status(409).json({ error: "Este e-mail já está cadastrado." })
    return
  }

  const newUser = await createUser(data.data.name, data.data.email)

  return res.status(201).json({ user: newUser })
}

export const verifyOTP: RequestHandler = async (req, res) => {
  const data = authVerifyOTPSchema.safeParse(req.body)

  if (!data.success) {
    res.status(400).json({
      error: "Preencha todos os campos corretamente",
    })
    return
  }


  const user = await validateOTP(data.data.id, data.data.code)

  if(!user) {
    res.status(400).json({ error: "Código inválido ou expirado" })
    return
  }

  const token = createJWT(user.id)

  res.json({ token, user })
}
