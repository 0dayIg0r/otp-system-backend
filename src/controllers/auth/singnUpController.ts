import { RequestHandler } from "express"
import { authSignUpSchema } from "../../schemas/auth-signup"
import { createUser, getUserByEmail } from "../../services/user/userService"

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