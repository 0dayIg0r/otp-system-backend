import { prisma } from "../../libs/prisma"

export const generateOTP = async (userId: number, email: string) => {
  let otpArray: number[] = []

  for (let q = 0; q < 6; q++) {
    otpArray.push(Math.floor(Math.random() * 9))
  }

  let code = otpArray.join("")

  let expiresAt = new Date()
  expiresAt.setMinutes(expiresAt.getMinutes() + 30)

  const otp = await prisma.otp.create({
    data: {
      code,
      email,
      expiresAt,
      userId,
    },
  })

  return otp
}

export const validateOTP = async (id: number, code: string) => {
  const otp = await prisma.otp.findFirst({
    where: {
      id,
      code,
      expiresAt: {
        gt: new Date(),
      },
      used: false,
    },
    select: {
      id: true,
      user: true,
    },
  })

  if (otp && otp.user) {
    await prisma.otp.update({
      where: {
        id: otp.id,
      },
      data: {
        used: true,
      },
    })
    

    return otp.user
  }

  return false
}
