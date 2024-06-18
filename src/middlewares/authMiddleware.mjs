import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { responseError } from '../utils/responseAPI.mjs'
import { errors } from '../utils/messageError.mjs'
import { prismaClient } from '../../src/app/db.mjs'

dotenv.config()

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res
            .status(errors.HTTP.CODE.UNAUTHORIZED)
            .send(
                responseError(
                    errors.HTTP.CODE.UNAUTHORIZED,
                    errors.HTTP.STATUS.UNAUTHORIZED,
                    errors.HTTP.MESSAGE.UNAUTHORIZED
                )
            )
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded

        // // Check if user is verified
        // const user = await prismaClient.user.findUnique({
        //     where: { user_id: decoded.userId },
        // })

        // if (!user) {
        //     return res
        //         .status(errors.HTTP.CODE.UNAUTHORIZED)
        //         .send(
        //             responseError(
        //                 errors.HTTP.CODE.UNAUTHORIZED,
        //                 errors.HTTP.STATUS.UNAUTHORIZED,
        //                 errors.HTTP.MESSAGE.UNAUTHORIZED
        //             )
        //         )
        // }

        // if (!user.active) {
        //     return res
        //         .status(errors.HTTP.CODE.FORBIDDEN)
        //         .send(
        //             responseError(
        //                 errors.HTTP.CODE.FORBIDDEN,
        //                 errors.HTTP.STATUS.FORBIDDEN,
        //                 'User not verified'
        //             )
        //         )
        // }

        next()
    } catch (e) {
        return res
            .status(errors.HTTP.CODE.UNAUTHORIZED)
            .send(
                responseError(
                    errors.HTTP.CODE.UNAUTHORIZED,
                    errors.HTTP.STATUS.UNAUTHORIZED,
                    errors.HTTP.MESSAGE.UNAUTHORIZED
                )
            )
    }
}

export default authMiddleware
