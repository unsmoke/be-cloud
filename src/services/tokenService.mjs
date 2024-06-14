import jwt from 'jsonwebtoken'
import { errors } from '../utils/messageError.mjs'
import { ResponseError } from '../utils/responseError.mjs'
import { prismaClient } from '../app/db.mjs'

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

export default { generateAccessToken, generateRefreshToken, refreshAccessToken }
