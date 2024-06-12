import userHealthService from '../services/userHealthService.mjs'
import { responseSuccess, responseError } from '../utils/responseAPI.mjs'
import { success } from '../utils/messageSuccess.mjs'
import { errors } from '../utils/messageError.mjs'

const getAllUserHealth = async (req, res, next) => {
    try {
        const userHealth = await userHealthService.fetchAllUserHealth()
        res.status(success.HTTP.CODE.OK).send(
            responseSuccess(success.HTTP.CODE.OK, success.HTTP.STATUS.OK, userHealth)
        )
    } catch (error) {
        next(error)
    }
}

const getUserHealthDetail = async (req, res, next) => {
    try {
        const user_id = req.user.userId
        const userHealth = await userHealthService.fetchUserHealthDetail(user_id)

        if (!userHealth) {
            return res
                .status(errors.HTTP.CODE.NOT_FOUND)
                .send(
                    responseError(
                        errors.HTTP.CODE.NOT_FOUND,
                        errors.HTTP.STATUS.NOT_FOUND,
                        'User health record not found'
                    )
                )
        }

        res.status(success.HTTP.CODE.OK).send(
            responseSuccess(success.HTTP.CODE.OK, success.HTTP.STATUS.OK, userHealth)
        )
    } catch (error) {
        next(error)
    }
}

const createUserHealth = async (req, res, next) => {
    try {
        const user_id = req.user.userId
        const data = req.body
        const newUserHealth = await userHealthService.createUserHealth(data, user_id)

        res.status(success.HTTP.CODE.CREATED).send(
            responseSuccess(success.HTTP.CODE.CREATED, success.HTTP.STATUS.CREATED, newUserHealth)
        )
    } catch (error) {
        next(error)
    }
}

const updateUserHealth = async (req, res, next) => {
    try {
        const { user_id } = req.params
        const data = req.body

        const existingUserHealth = await userHealthService.fetchUserHealthDetail(user_id)

        if (!existingUserHealth) {
            return res
                .status(errors.HTTP.CODE.NOT_FOUND)
                .send(
                    responseError(
                        errors.HTTP.CODE.NOT_FOUND,
                        errors.HTTP.STATUS.NOT_FOUND,
                        'User health record not found'
                    )
                )
        }

        const updatedUserHealth = await userHealthService.updateUserHealth(user_id, data)
        res.status(success.HTTP.CODE.OK).send(
            responseSuccess(success.HTTP.CODE.OK, success.HTTP.STATUS.OK, updatedUserHealth)
        )
    } catch (error) {
        next(error)
    }
}

const deleteUserHealth = async (req, res, next) => {
    try {
        const { user_id } = req.params

        const existingUserHealth = await userHealthService.fetchUserHealthDetail(user_id)

        if (!existingUserHealth) {
            return res
                .status(errors.HTTP.CODE.NOT_FOUND)
                .send(
                    responseError(
                        errors.HTTP.CODE.NOT_FOUND,
                        errors.HTTP.STATUS.NOT_FOUND,
                        'User health record not found'
                    )
                )
        }

        await userHealthService.deleteUserHealth(user_id)
        res.status(success.HTTP.CODE.NO_CONTENT).send()
    } catch (error) {
        next(error)
    }
}

export default {
    getAllUserHealth,
    getUserHealthDetail,
    createUserHealth,
    updateUserHealth,
    deleteUserHealth,
}
