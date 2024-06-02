import userServices from '../services/userServices.mjs'
import { success } from '../utils/messageSuccess.mjs'
import { errors } from '../utils/messageError.mjs'
import { responseError, responseSuccess } from '../utils/responseAPI.mjs'

const login = async (req, res) => {
    try {
        const result = await userServices.loginUser(req.body)
        res.status(success.HTTP.CODE.OK).send(
            responseSuccess(success.HTTP.CODE.OK, success.HTTP.STATUS.OK, result)
        )
    } catch (e) {
        res.status(errors.HTTP.CODE.INTERNAL_SERVER_ERROR).send(
            responseError(
                errors.HTTP.CODE.INTERNAL_SERVER_ERROR,
                errors.HTTP.STATUS.INTERNAL_SERVER_ERROR,
                e.message
            )
        )
    }
}

const register = async (req, res) => {
    try {
        const result = await userServices.registerUser(req.body)
        res.status(success.HTTP.CODE.OK).send(
            responseSuccess(success.HTTP.CODE.OK, success.HTTP.STATUS.OK, result)
        )
    } catch (e) {
        res.status(errors.HTTP.CODE.INTERNAL_SERVER_ERROR).send(
            responseError(
                errors.HTTP.CODE.INTERNAL_SERVER_ERROR,
                errors.HTTP.STATUS.INTERNAL_SERVER_ERROR,
                e.message
            )
        )
    }
}

const refresh = async (req, res) => {
    try {
        const result = await userServices.refreshAccessToken(req.body)
        res.status(success.HTTP.CODE.OK).send(
            responseSuccess(success.HTTP.CODE.OK, success.HTTP.STATUS.OK, result)
        )
    } catch (e) {
        res.status(errors.HTTP.CODE.INTERNAL_SERVER_ERROR).send(
            responseError(
                errors.HTTP.CODE.INTERNAL_SERVER_ERROR,
                errors.HTTP.STATUS.INTERNAL_SERVER_ERROR,
                e.message
            )
        )
    }
}

export default {
    login,
    register,
    refresh,
}
