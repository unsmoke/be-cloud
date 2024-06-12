import express from 'express'
import itemController from '../controllers/itemController.mjs'
import authMiddleware from '../middlewares/authMiddleware.mjs'
import { validateItem } from '../validations/itemValidations.mjs'

const itemRouter = express.Router()

itemRouter.get('/item', authMiddleware, itemController.getAllItems)
itemRouter.get('/item/:item_id', authMiddleware, itemController.getItemDetail)
itemRouter.post('/item', authMiddleware, validateItem, itemController.createNewItem)
itemRouter.put('/item/:item_id', authMiddleware, validateItem, itemController.updateItem)
itemRouter.delete('/item/:item_id', authMiddleware, itemController.deleteItem)

export default itemRouter
