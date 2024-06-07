import shopService from '../services/shopService.mjs'
import { responseSuccess } from '../utils/responseAPI.mjs'
import { success } from '../utils/messageSuccess.mjs'

const getShop = async (req, res, next) => {
    try {
        const result = await shopService.getUserShop(req.user.userId)
        res.status(success.HTTP.CODE.OK).send(
            responseSuccess(success.HTTP.CODE.OK, success.HTTP.STATUS.OK, result)
        )
    } catch (e) {
        next(e)
    }
}

const buyItem = async (req, res, next) => {
    try {
        const result = await shopService.buyShopItem(req.user.userId, req.body)
        res.status(success.HTTP.CODE.OK).send(
            responseSuccess(success.HTTP.CODE.OK, success.HTTP.STATUS.OK, result)
        )
    } catch (e) {
        next(e)
    }
}

export default { getShop, buyItem }
