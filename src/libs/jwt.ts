import jwt from "jsonwebtoken"
import { ExtendedRequest } from "../types/extended-request"
import { NextFunction, Response } from "express"

export const createJWT = (id: number) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: "7d" })
}

export const verifyJWT = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: "Acesso negado" })
  }

  const token = authHeader.split(" ")[1]

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Acesso negado" })
    } else {
      req.userId = (decoded as { id: number }).id
      next()
    }
  })
}
