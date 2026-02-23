import { prisma } from "../../libs/prisma"

export const generateOTP = async (userId: number) => {
  let otpArray: number[] = []

  for (let q = 0; q < 6; q++) {
    otpArray.push(Math.floor(Math.random() * 9))
  }

  let code = otpArray.join(" ")

  let expiresIn = new Date()
  expiresIn.setMinutes(expiresIn.getMinutes() + 30)

  const otp = await prisma.otp.create({
    data: {
      code,
      expiresIn,
      userId,
    },
  })

  return otp
}
