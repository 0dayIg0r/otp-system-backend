import { MailtrapClient } from "mailtrap"
import "dotenv/config"

export const sendEmail = async (to: string, subject: string, text: string) => {
  const mailtrap = new MailtrapClient({
    token: process.env.MAILTRAP_API_KEY as string,
    sandbox: true,
    testInboxId: 2989997,
  })

  try {
    await mailtrap.send({
      from: {
        name: "Seu código de acesso",
        email: "system@testing.com",
      },
      to: [
        {
          email: to,
        },
      ],
      subject: subject,
      text: text,
    })
  } catch (error) {
    throw error
  }
}
