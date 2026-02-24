import { RequestHandler } from "express"
import { ExtendedRequest } from "../../types/extended-request"
import { getUserById } from "../../services/user/getUserService"


export const privateRouter: RequestHandler = async (
  req: ExtendedRequest,
  res,
) => {
  if (!req.userId) {
    return res.status(401).json({ error: "Acesso não autorizado" })
  }

  const user = await getUserById(req.userId)

  if (!user) {
    return res.status(401).json({ error: "Acesso não autorizado" })
  }

  return res.json({ user })
}
