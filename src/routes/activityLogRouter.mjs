import express from 'express'
import activityLogController from '../controllers/activityLogController.mjs'
import authMiddleware from '../middlewares/authMiddleware.mjs'

const activityLogRouter = express.Router()

activityLogRouter.get(
    '/activity-logs/:userId',
    authMiddleware,
    activityLogController.getActivityLogByUserId
)

export default activityLogRouter
