import userItemService from '../services/userItemService.mjs'
import { responseSuccess, responseError } from '../utils/responseAPI.mjs'
import { success } from '../utils/messageSuccess.mjs'
import { errors } from '../utils/messageError.mjs'

const getAllUserItems = async (req, res, next) => {
    try {
        const userItems = await userItemService.fetchAllUserUserItems()
        res.status(success.HTTP.CODE.OK).send(
            responseSuccess(success.HTTP.CODE.OK, success.HTTP.STATUS.OK, userItems)
        )
    } catch (e) {
        next(e)
    }
}

const getUserItems = async (req, res, next) => {
    try {
        const user_id = req.user.userId
        const userItems = await userItemService.fetchUserInventory(user_id)
        res.status(success.HTTP.CODE.OK).send(
            responseSuccess(success.HTTP.CODE.OK, success.HTTP.STATUS.OK, userItems)
        )
    } catch (e) {
        next(e)
    }
}

const getUserItemDetail = async (req, res, next) => {
    try {
        const { user_id, item_id } = req.params
        const userItem = await userItemService.fetchUserItemDetail(user_id, item_id)
        if (!userItem) {
            return res
                .status(errors.HTTP.CODE.NOT_FOUND)
                .send(
                    responseError(
                        errors.HTTP.CODE.NOT_FOUND,
                        errors.HTTP.STATUS.NOT_FOUND,
                        'User item not found'
                    )
                )
        }
        res.status(success.HTTP.CODE.OK).send(
            responseSuccess(success.HTTP.CODE.OK, success.HTTP.STATUS.OK, userItem)
        )
    } catch (e) {
        next(e)
    }
}

const createUserItem = async (req, res, next) => {
    try {
        const { user_id, item_id } = req.body
        const newUserItem = await userItemService.createUserItem(user_id, item_id)
        res.status(success.HTTP.CODE.CREATED).send(
            responseSuccess(success.HTTP.CODE.CREATED, success.HTTP.STATUS.CREATED, newUserItem)
        )
    } catch (e) {
        next(e)
    }
}

const updateUserItem = async (req, res, next) => {
    try {
        const { user_id, item_id } = req.params
        const { new_item_id } = req.body
        const existingUserItem = await userItemService.fetchUserItemDetail(user_id, item_id)
        if (!existingUserItem) {
            return res
                .status(errors.HTTP.CODE.NOT_FOUND)
                .send(
                    responseError(
                        errors.HTTP.CODE.NOT_FOUND,
                        errors.HTTP.STATUS.NOT_FOUND,
                        'User item not found'
                    )
                )
        }
        const updatedUserItem = await userItemService.modifyUserItem(user_id, item_id, new_item_id)
        res.status(success.HTTP.CODE.OK).send(
            responseSuccess(success.HTTP.CODE.OK, success.HTTP.STATUS.OK, updatedUserItem)
        )
    } catch (e) {
        next(e)
    }
}

const deleteUserItem = async (req, res, next) => {
    try {
        const { user_id, item_id } = req.params
        const existingUserItem = await userItemService.fetchUserItemDetail(user_id, item_id)
        if (!existingUserItem) {
            return res
                .status(errors.HTTP.CODE.NOT_FOUND)
                .send(
                    responseError(
                        errors.HTTP.CODE.NOT_FOUND,
                        errors.HTTP.STATUS.NOT_FOUND,
                        'User item not found'
                    )
                )
        }
        await userItemService.removeUserItem(user_id, item_id)
        res.status(success.HTTP.CODE.NO_CONTENT).send()
    } catch (e) {
        next(e)
    }
}

export default {
    getUserItems,
    getAllUserItems,
    getUserItemDetail,
    createUserItem,
    updateUserItem,
    deleteUserItem,
}
