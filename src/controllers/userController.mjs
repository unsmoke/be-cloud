import userService from '../services/userService.mjs'
import {success} from '../utils/messageSuccess.mjs'
import {responseSuccess} from '../utils/responseAPI.mjs'
import tokenService from "../services/tokenService.mjs";

const login = async (req, res, next) => {
    try {
        const result = await userService.loginUser(req.body)
        res.status(success.HTTP.CODE.OK).send(
            responseSuccess(success.HTTP.CODE.OK, success.HTTP.STATUS.OK, result)
        )
    } catch (e) {
        next(e)
    }
}

const register = async (req, res, next) => {
    try {
        const result = await userService.registerUser(req.body)
        res.status(success.HTTP.CODE.OK).send(
            responseSuccess(success.HTTP.CODE.OK, success.HTTP.STATUS.OK, result)
        )
    } catch (e) {
        next(e)
    }
}

const refresh = async (req, res, next) => {
    try {
        const result = await tokenService.refreshAccessToken(req.body)
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
