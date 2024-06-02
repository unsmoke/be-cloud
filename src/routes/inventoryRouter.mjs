import express from 'express'
import inventoryController from "../controllers/inventoryController.mjs";
import authMiddleware from '../middlewares/authMiddleware.mjs'

const inventoryRouter = express.Router()

inventoryRouter.get('/inventory', authMiddleware, inventoryController.getUserInventory)

export default inventoryRouter