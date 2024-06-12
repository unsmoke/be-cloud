import express from 'express'
import userItemController from '../controllers/userItemController.mjs'
import authMiddleware from '../middlewares/authMiddleware.mjs'
import { validateUserItem, validateUserItemParams } from '../validations/userItemValidations.mjs'

const userItemRouter = express.Router()

userItemRouter.get('/inventory', authMiddleware, userItemController.getUserItems)
// userItemRouter.get('/inventory/all', authMiddleware, userItemController.getAllUserItems);
userItemRouter.get(
    '/inventory/:user_id/:item_id',
    authMiddleware,
    validateUserItemParams,
    userItemController.getUserItemDetail
)
userItemRouter.post(
    '/inventory',
    authMiddleware,
    validateUserItem,
    userItemController.createUserItem
)
userItemRouter.put(
    '/inventory/:user_id/:item_id',
    authMiddleware,
    validateUserItemParams,
    validateUserItem,
    userItemController.updateUserItem
)
userItemRouter.delete(
    '/inventory/:user_id/:item_id',
    authMiddleware,
    validateUserItemParams,
    userItemController.deleteUserItem
)

export default userItemRouter
