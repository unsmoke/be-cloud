import shopItemService from '../services/shopItemService.mjs'
import { responseSuccess, responseError } from '../utils/responseAPI.mjs'
import { success } from '../utils/messageSuccess.mjs'
import { errors } from '../utils/messageError.mjs'

const getAllShopItems = async (req, res, next) => {
    try {
        const shopItems = await shopItemService.fetchAllShopItems()
        res.status(success.HTTP.CODE.OK).send(
            responseSuccess(success.HTTP.CODE.OK, success.HTTP.STATUS.OK, shopItems)
        )
    } catch (error) {
        next(error)
    }
}

const getUserShop = async (req, res, next) => {
    try {
        const user_id = req.user.userId
        const shopItems = await shopItemService.fetchShopItemsByUser(user_id)
        res.status(success.HTTP.CODE.OK).send(
            responseSuccess(success.HTTP.CODE.OK, success.HTTP.STATUS.OK, shopItems)
        )
    } catch (error) {
        next(error)
    }
}

const getShopItemDetail = async (req, res, next) => {
    try {
        const { user_id, item_id } = req.params
        const shopItem = await shopItemService.fetchShopItemDetail(user_id, item_id)

        if (!shopItem) {
            return res
                .status(failure.HTTP.CODE.NOT_FOUND)
                .send(
                    responseError(
                        failure.HTTP.CODE.NOT_FOUND,
                        failure.HTTP.STATUS.NOT_FOUND,
                        'Shop item not found'
                    )
                )
        }

        res.status(success.HTTP.CODE.OK).send(
            responseSuccess(success.HTTP.CODE.OK, success.HTTP.STATUS.OK, shopItem)
        )
    } catch (error) {
        next(error)
    }
}

const createShopItem = async (req, res, next) => {
    try {
        const { user_id, item_id } = req.body
        const newShopItem = await shopItemService.createShopItem(user_id, item_id)

        res.status(success.HTTP.CODE.CREATED).send(
            responseSuccess(success.HTTP.CODE.CREATED, success.HTTP.STATUS.CREATED, newShopItem)
        )
    } catch (error) {
        next(error)
    }
}

const updateShopItem = async (req, res, next) => {
    try {
        const { user_id, item_id } = req.params
        const { new_item_id } = req.body

        const existingShopItem = await shopItemService.fetchShopItemDetail(user_id, item_id)

        if (!existingShopItem) {
            return res
                .status(errors.HTTP.CODE.NOT_FOUND)
                .send(
                    responseError(
                        errors.HTTP.CODE.NOT_FOUND,
                        errors.HTTP.STATUS.NOT_FOUND,
                        'Shop item not found'
                    )
                )
        }

        const updatedShopItem = await shopItemService.modifyShopItem(user_id, item_id, new_item_id)
        res.status(success.HTTP.CODE.OK).send(
            responseSuccess(success.HTTP.CODE.OK, success.HTTP.STATUS.OK, updatedShopItem)
        )
    } catch (error) {
        next(error)
    }
}

const deleteShopItem = async (req, res, next) => {
    try {
        const { user_id, item_id } = req.params

        const existingShopItem = await shopItemService.fetchShopItemDetail(user_id, item_id)

        if (!existingShopItem) {
            return res
                .status(errors.HTTP.CODE.NOT_FOUND)
                .send(
                    responseError(
                        errors.HTTP.CODE.NOT_FOUND,
                        errors.HTTP.STATUS.NOT_FOUND,
                        'Shop item not found'
                    )
                )
        }

        await shopItemService.removeShopItem(user_id, item_id)
        res.status(success.HTTP.CODE.NO_CONTENT).send()
    } catch (error) {
        next(error)
    }
}

export default {
    getAllShopItems,
    getUserShop,
    getShopItemDetail,
    createShopItem,
    updateShopItem,
    deleteShopItem,
}
