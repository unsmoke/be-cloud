import jwt from 'jsonwebtoken'
import { errors } from '../utils/messageError.mjs'
import { ResponseError } from '../utils/responseError.mjs'
import { prismaClient } from '../app/db.mjs'
import { generateToken as generateTokenUtil } from '../utils/tokenUtils.mjs'

const generateAccessToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '30d' })
}

const generateRefreshToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' })
}

const refreshAccessToken = async (requestBody) => {
    const { refreshToken } = requestBody

    const { userId } = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)

    const user = await prismaClient.user.findUnique({ where: { user_id: userId } })
    if (!user) {
        throw new ResponseError(
            errors.HTTP.CODE.UNAUTHORIZED,
            errors.HTTP.STATUS.UNAUTHORIZED,
            errors.AUTHORIZATION.INVALID_REFRESH_TOKEN
        )
    }

    const payload = { userId: user.user_id }

    const newAccessToken = generateAccessToken(payload)

    return { accessToken: newAccessToken }
}

const generateToken = async (user_id) => {
    const token = generateTokenUtil()
    const expiresAt = new Date(Date.now() + 3600000) // Token expires in 1 hour
    await prismaClient.token.create({
        data: {
            token,
            user_id: user_id,
            expires_at: expiresAt,
        },
    })
    return token
}

const verifyToken = async (user_id, token) => {
    const tokenRecord = await prismaClient.token.findFirst({
        where: {
            token,
            user_id: user_id,
        },
    })
    if (!tokenRecord) return false

    if (tokenRecord.expires_at < new Date()) {
        await prismaClient.token.delete({
            where: { id: tokenRecord.id },
        })
        return false
    }

    await prismaClient.token.delete({
        where: { id: tokenRecord.id },
    })

    return true
}

export default {
    generateAccessToken,
    generateRefreshToken,
    refreshAccessToken,
    generateToken,
    verifyToken,
}
