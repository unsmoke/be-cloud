import express from 'express'
import activityLogController from '../controllers/activityLogController.mjs'
import authMiddleware from '../middlewares/authMiddleware.mjs'

const activityLogRouter = express.Router()

activityLogRouter.get('/activity-logs', authMiddleware, activityLogController.getAllActivityLogs)
activityLogRouter.get(
    '/activity-logs/:id',
    authMiddleware,
    activityLogController.getActivityLogById
)
activityLogRouter.post('/activity-logs', authMiddleware, activityLogController.createActivityLog)
activityLogRouter.put('/activity-logs/:id', authMiddleware, activityLogController.updateActivityLog)
activityLogRouter.delete(
    '/activity-logs/:id',
    authMiddleware,
    activityLogController.deleteActivityLog
)

export default activityLogRouter
