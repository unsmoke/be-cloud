import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
    },
})

export const sendVerificationEmail = (email, token) => {
    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: 'UNSMOKE Email Verification',
        text: `Your verification code is: ${token}`,
    }

    return transporter.sendMail(mailOptions)
}

export const sendResetPasswordEmail = (email, token) => {
    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: 'UNSMOKE Password Reset',
        text: `Your password reset code is: ${token}`,
    }

    return transporter.sendMail(mailOptions)
}
