import nodemailer from 'nodemailer'
import { config } from '../config'
import { Email } from '../interfaces/email.interface'

const sendEmail = async (infoMail: Email): Promise<{ message: string }> => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true,
    port: 465,
    auth: {
      user: config.smtpEmail,
      pass: config.smtpPassword
    }
  })
  await transporter.sendMail(infoMail)
  return { message: 'mail sent' }
}

export { sendEmail }
