import bcrypt from 'bcrypt'
import {prismaClient} from '../app/db.mjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import {ResponseError} from "../utils/responseError.mjs";
import {errors} from "../utils/messageError.mjs";

dotenv.config()

const generateRefreshToken = (userId) => {
    const payload = {userId}
    const secretKey = process.env.JWT_REFRESH_SECRET
    const expiresIn = '7d'

    return jwt.sign(payload, secretKey, {expiresIn})
}

const registerUser = async (requestBody) => {
    const {fullName, email, password} = requestBody

    const existingUser = await prismaClient.user.findUnique({where: {email}})
    if (existingUser) {
        throw new ResponseError(
            errors.HTTP.CODE.BAD_REQUEST,
            errors.HTTP.STATUS.BAD_REQUEST,
            errors.USER.EMAIL_ALREADY_EXISTS
        )
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    return prismaClient.user.create({
        data: {full_name: fullName, email, password: hashedPassword},
        select: {
            user_id: true,
            full_name: true,
            email: true,
        },
    });
}

const loginUser = async (requestBody) => {
    const {email, password} = requestBody

    const user = await prismaClient.user.findUnique({where: {email}})
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

    const payload = {userId: user.user_id}

    const accessTokenSecretKey = process.env.JWT_SECRET

    const accessToken = await jwt.sign(payload, accessTokenSecretKey, {expiresIn: '1h'})

    const refreshToken = await generateRefreshToken(user.user_id)

    const {user_id, full_name, email: userEmail} = user

    return {user_id, full_name, email: userEmail, accessToken, refreshToken}
}

const refreshAccessToken = async (requestBody) => {
    const {refreshToken} = requestBody

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
    const userId = decoded.userId

    const user = await prismaClient.user.findUnique({where: {user_id: userId}})
    if (!user) {
        throw new ResponseError(
            errors.HTTP.CODE.UNAUTHORIZED,
            errors.HTTP.STATUS.UNAUTHORIZED,
            errors.AUTHORIZATION.INVALID_REFRESH_TOKEN
        )
    }

    const newAccessToken = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '1h'})

    return {accessToken: newAccessToken}
}

export default {registerUser, loginUser, refreshAccessToken}
