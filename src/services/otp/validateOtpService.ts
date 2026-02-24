import { prisma } from "../../libs/prisma"

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
