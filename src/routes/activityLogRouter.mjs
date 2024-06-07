import express from 'express'
import activityLogController from '../controllers/activityLogController.mjs'

const activityLogRouter = express.Router()

activityLogRouter.get('/', activityLogController.getAll)
activityLogRouter.get('/:id', activityLogController.getById)
activityLogRouter.post('/', activityLogController.create)
activityLogRouter.put('/:id', activityLogController.update)
activityLogRouter.delete('/:id', activityLogController.remove)

export default activityLogRouter
