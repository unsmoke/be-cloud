import express from 'express'
import shopItemController from '../controllers/shopItemController.mjs'
import authMiddleware from '../middlewares/authMiddleware.mjs'
import { validateShopItem, validateShopItemParams } from '../validations/shopItemValidations.mjs'

const shopItemRouter = express.Router()

shopItemRouter.get('/shop', authMiddleware, shopItemController.getUserShop)
// shopItemRouter.get('/shop/all', authMiddleware, shopItemController.getAllShopItems);
shopItemRouter.get(
    '/shop/:user_id/:item_id',
    authMiddleware,
    validateShopItemParams,
    shopItemController.getShopItemDetail
)
// shopItemRouter.post('/shop', authMiddleware, validateShopItem, shopItemController.createShopItem)
// shopItemRouter.put(
//     '/shop/:user_id/:item_id',
//     authMiddleware,
//     validateShopItemParams,
//     validateShopItem,
//     shopItemController.updateShopItem
// )
// shopItemRouter.delete(
//     '/shop/:user_id/:item_id',
//     authMiddleware,
//     validateShopItemParams,
//     shopItemController.deleteShopItem
// )

export default shopItemRouter
