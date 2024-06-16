import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { responseError } from '../utils/responseAPI.mjs'
import { errors } from '../utils/messageError.mjs'

dotenv.config()

const authMiddleware = (req, res, next) => {
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
