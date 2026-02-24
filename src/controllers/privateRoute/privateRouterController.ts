import { RequestHandler } from "express"
import { ExtendedRequest } from "../../types/extended-request"
import { getUserById } from "../../services/user/getUserByIdService"

export const privateRouter: RequestHandler = async (req: ExtendedRequest, res) => {
  if (!req.userId) {
    return res.status(401).json({ error: "Acesso não autorizado" })
  }
  res.json({ userId: req.userId })

  const user = await getUserById(req.userId)

  if (!user) {
    return res.status(401).json({ error: "Acesso não autorizado" })
  }

  res.json({ user })
}
