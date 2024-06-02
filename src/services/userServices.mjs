import bcrypt from 'bcrypt'
import { prismaClient } from '../app/db.mjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const generateRefreshToken = (userId) => {
    const payload = { userId }
    const secretKey = process.env.JWT_REFRESH_SECRET
    const expiresIn = '7d'

    const refreshToken = jwt.sign(payload, secretKey, { expiresIn })
    return refreshToken
}

const registerUser = async (requestBody) => {
    const { fullName, email, password } = requestBody

    const existingUser = await prismaClient.user.findUnique({ where: { email } })
    if (existingUser) {
        throw new Error('Email already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = await prismaClient.user.create({
        data: { full_name: fullName, email, password: hashedPassword },
        select: {
            user_id: true,
            full_name: true,
            email: true,
        },
    })

    return newUser
}

const loginUser = async (requestBody) => {
    const { email, password } = requestBody

    const user = await prismaClient.user.findUnique({ where: { email } })
    if (!user) {
        throw new Error('Invalid email or password')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Invalid email or password')
    }

    const payload = { userId: user.user_id }

    const accessTokenSecretKey = process.env.JWT_SECRET

    const accessToken = await jwt.sign(payload, accessTokenSecretKey, { expiresIn: '1h' })

    const refreshToken = await generateRefreshToken(user.user_id)

    const { user_id, full_name, email: userEmail } = user

    return { user_id, full_name, email: userEmail, accessToken, refreshToken }
}

const refreshAccessToken = async (requestBody) => {
    const { refreshToken } = requestBody

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
    const userId = decoded.userId

    const user = await prismaClient.user.findUnique({ where: { user_id: userId } })
    if (!user) {
        throw new Error('Invalid refresh token')
    }

    const newAccessToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' })

    return { accessToken: newAccessToken }
}

export default { registerUser, loginUser, refreshAccessToken }
