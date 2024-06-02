import express from 'express'
import itemController from "../controllers/itemController.mjs";
import authMiddleware from '../middlewares/authMiddleware.mjs'

const itemRouter = express.Router()

itemRouter.get('/item/:item_id', authMiddleware, itemController.getItem)

export default itemRouter