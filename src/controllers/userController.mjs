import userService from '../services/userService.mjs'
import { success } from '../utils/messageSuccess.mjs'
import { responseSuccess } from '../utils/responseAPI.mjs'
import tokenService from '../services/tokenService.mjs'

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

const getUser = async (req, res, next) => {
    try {
        const user_id = req.user.userId
        const result = await userService.fetchUser(user_id)
        res.status(success.HTTP.CODE.OK).send(
            responseSuccess(success.HTTP.CODE.OK, success.HTTP.STATUS.OK, result)
        )
    } catch (e) {
        next(e)
    }
}

const updateUserProfile = async (req, res, next) => {
    try {
        const { username } = req.body
        const user_id = req.user.userId
        const result = await userService.modifyUserProfile(user_id, username, req.file)
        res.status(success.HTTP.CODE.OK).send(
            responseSuccess(success.HTTP.CODE.OK, success.HTTP.STATUS.OK, result)
        )
    } catch (e) {
        next(e)
    }
}

const verifyEmail = async (req, res, next) => {
    try {
        const { email, token } = req.body
        const result = await userService.verifyUserEmail(email, token)
        res.status(success.HTTP.CODE.OK).send(
            responseSuccess(success.HTTP.CODE.OK, success.HTTP.STATUS.OK, result)
        )
    } catch (e) {
        next(e)
    }
}

const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body
        const result = await userService.forgotUserPassword(email)
        res.status(success.HTTP.CODE.OK).send(
            responseSuccess(success.HTTP.CODE.OK, success.HTTP.STATUS.OK, result)
        )
    } catch (e) {
        next(e)
    }
}

const resetPassword = async (req, res, next) => {
    try {
        const { email, token, new_password } = req.body
        const result = await userService.resetUserPassword(email, token, new_password)
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
    getUser,
    updateUserProfile,
    verifyEmail,
    forgotPassword,
    resetPassword,
}
