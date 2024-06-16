import bcrypt from 'bcrypt'
import { prismaClient } from '../app/db.mjs'
import dotenv from 'dotenv'
import { ResponseError } from '../utils/responseError.mjs'
import { errors } from '../utils/messageError.mjs'
import tokenService from './tokenService.mjs'
import { generateUsername } from '../utils/usernameGenerator.mjs'
import { v4 as uuidv4 } from 'uuid'
import { bucket } from '../configs/gcsConfig.mjs'

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

    const newUser = await prismaClient.user.create({
        data: { full_name: fullName, email, password: hashedPassword, username: generatedUsername },
        select: {
            user_id: true,
            full_name: true,
            email: true,
            username: true,
        },
    })

    const items = await prismaClient.item.findMany()

    for (const item of items) {
        await prismaClient.shopItem.create({
            data: {
                user_id: newUser.user_id,
                item_id: item.item_id,
            },
        })
    }

    return newUser
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

    return { user_id: user.user_id, accessToken, refreshToken }
}

const fetchUser = async (user_id) => {
    try {
        // Fetch the user without the password
        const user = await prismaClient.user.findUnique({
            where: {
                user_id: user_id,
            },
            select: {
                user_id: true,
                full_name: true,
                username: true,
                email: true,
                time_zone: true,
                balance_coin: true,
                exp: true,
                streak_count: true,
                money_saved: true,
                cigarettes_avoided: true,
                cigarettes_quota: true,
                province: true,
                city: true,
                is_premium: true,
                profile_url: true,
                created_at: true,
                updated_at: true,
            },
        })

        if (!user) {
            throw new Error('User not found')
        }

        // Fetch all users in the same province and order by exp
        const allUsers = await prismaClient.user.findMany({
            where: { province: user.province },
            orderBy: { exp: 'desc' },
            select: {
                user_id: true,
                full_name: true,
                username: true,
                email: true,
                time_zone: true,
                balance_coin: true,
                exp: true,
                streak_count: true,
                money_saved: true,
                cigarettes_avoided: true,
                cigarettes_quota: true,
                province: true,
                city: true,
                is_premium: true,
                profile_url: true,
                created_at: true,
                updated_at: true,
            },
        })

        // Calculate the rank of the user
        const userWithRank = allUsers
            .map((u, index) => ({
                ...u,
                rank: index + 1,
            }))
            .find((u) => u.user_id === user_id)

        return userWithRank
    } catch (error) {
        throw new Error('Error fetching user with rank')
    }
}

const modifyUserProfile = async (user_id, username, file) => {
    const fileExtension = file.originalname.split('.').pop()
    const gcsFileName = `user-profiles/${user_id}-${uuidv4()}.${fileExtension}`
    const blob = bucket.file(gcsFileName)

    // Delete existing files for the user
    const [files] = await bucket.getFiles({ prefix: `user-profiles/${user_id}-` })
    await Promise.all(files.map((file) => file.delete()))

    // Upload the new file
    const blobStream = blob.createWriteStream({
        resumable: false,
        contentType: file.mimetype,
    })

    const publicUrl = await new Promise((resolve, reject) => {
        blobStream.on('finish', () => {
            const url = `https://storage.googleapis.com/${bucket.name}/${gcsFileName}`
            resolve(url)
        })

        blobStream.on('error', (err) => {
            reject(err)
        })

        blobStream.end(file.buffer)
    })

    const updatedUser = await prismaClient.user.update({
        where: { user_id: user_id },
        data: {
            username: username,
            profile_url: publicUrl,
        },
        select: {
            user_id: true,
            full_name: true,
            username: true,
            profile_url: true,
            created_at: true,
            updated_at: true,
        },
    })

    return updatedUser
}

export default { registerUser, loginUser, fetchUser, modifyUserProfile }
