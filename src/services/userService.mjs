import bcrypt from 'bcrypt'
import { prismaClient } from '../app/db.mjs'
import dotenv from 'dotenv'
import { ResponseError } from '../utils/responseError.mjs'
import { errors } from '../utils/messageError.mjs'
import tokenService from './tokenService.mjs'
import { generateUsername } from '../utils/usernameGenerator.mjs'

dotenv.config()

const registerUser = async (requestBody) => {
    const { fullName, email, password } = requestBody

    const existingUser = await prismaClient.user.findUnique({ where: { email } })
    if (existingUser) {
        throw new ResponseError(
            errors.HTTP.CODE.BAD_REQUEST,
            errors.HTTP.STATUS.BAD_REQUEST,
            errors.USER.EMAIL_ALREADY_EXISTS
        )
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const generatedUsername = fullName.split(' ')[0] + '#' + generateUsername()

    return prismaClient.user.create({
        data: { full_name: fullName, email, password: hashedPassword, username: generatedUsername },
        select: {
            user_id: true,
            full_name: true,
            email: true,
            username: true,
        },
    })
}

const loginUser = async (requestBody) => {
    const { email, password } = requestBody

    const user = await prismaClient.user.findUnique({ where: { email } })
    if (!user) {
        throw new ResponseError(
            errors.HTTP.CODE.NOT_FOUND,
            errors.HTTP.STATUS.NOT_FOUND,
            errors.USER.NOT_FOUND
        )
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new ResponseError(
            errors.HTTP.CODE.UNAUTHORIZED,
            errors.HTTP.STATUS.UNAUTHORIZED,
            errors.AUTHENTICATION.INVALID_CREDENTIALS
        )
    }

    const payload = { userId: user.user_id }

    const accessToken = tokenService.generateAccessToken(payload)

    const refreshToken = tokenService.generateRefreshToken(payload)

    return { accessToken, refreshToken }
}

export default { registerUser, loginUser }
