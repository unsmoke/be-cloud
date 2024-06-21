import { prismaClient } from '../app/db.mjs'
import { errors } from '../utils/messageError.mjs'
import { ResponseError } from '../utils/responseError.mjs'

export const checkDBMiddleware = async (req, res, next) => {
    try {
        await prismaClient.$connect()
        next()
    } catch (e) {
        throw new ResponseError(
            errors.HTTP.CODE.INTERNAL_SERVER_ERROR,
            errors.HTTP.STATUS.INTERNAL_SERVER_ERROR,
            errors.DATABASE.CONNECTION
        )
    }
}
