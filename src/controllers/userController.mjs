import userServices from '../services/userServices.mjs'
import {success} from '../utils/messageSuccess.mjs'
import {responseSuccess} from '../utils/responseAPI.mjs'

const login = async (req, res, next) => {
    try {
        const result = await userServices.loginUser(req.body)
        res.status(success.HTTP.CODE.OK).send(
            responseSuccess(success.HTTP.CODE.OK, success.HTTP.STATUS.OK, result)
        )
    } catch (e) {
        next(e)
    }
}

const register = async (req, res, next) => {
    try {
        const result = await userServices.registerUser(req.body)
        res.status(success.HTTP.CODE.OK).send(
            responseSuccess(success.HTTP.CODE.OK, success.HTTP.STATUS.OK, result)
        )
    } catch (e) {
        next(e)
    }
}

const refresh = async (req, res, next) => {
    try {
        const result = await userServices.refreshAccessToken(req.body)
        res.status(success.HTTP.CODE.OK).send(
            responseSuccess(success.HTTP.CODE.OK, success.HTTP.STATUS.OK, result)
        )
    } catch (e) {
        next(e)
    }
}

export default {
    login,
    register,
    refresh,
}
