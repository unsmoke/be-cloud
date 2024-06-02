import express from 'express'
import shopController from "../controllers/shopController.mjs";
import authMiddleware from '../middlewares/authMiddleware.mjs'
import { validateBuyItem } from '../validations/shopValidations.mjs'

const shopRouter = express.Router()

shopRouter.get('/shop', authMiddleware, shopController.getShop)
shopRouter.post('/shop', authMiddleware, validateBuyItem, shopController.buyItem)

export default shopRouter