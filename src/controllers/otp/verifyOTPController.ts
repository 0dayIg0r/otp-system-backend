import { RequestHandler } from "express"
import { authVerifyOTPSchema } from "../../schemas/auth-otp"
import { validateOTP } from "../../services/otp/validateOtpService"
import { createJWT } from "../../libs/jwt"

export const verifyOTPController: RequestHandler = async (req, res) => {
  const data = authVerifyOTPSchema.safeParse(req.body)

  if (!data.success) {
    const firstIssue = data.error.issues[0]

    return res.status(400).json({
      error: firstIssue?.message ?? "Dados inválidos",
      code: firstIssue?.code,
      path: firstIssue?.path,
    })
  }

  const user = await validateOTP(data.data.id, data.data.code)

  if (!user) {
    res.status(400).json({ error: "Código inválido ou expirado" })
    return
  }

  const token = createJWT(user.id)

  res.json({ token, user })
}