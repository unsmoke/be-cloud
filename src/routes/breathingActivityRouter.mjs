import express from 'express'
import breathingActivityController from '../controllers/breathingActivityController.mjs'
import authMiddleware from '../middlewares/authMiddleware.mjs'

const breathingActivityRouter = express.Router()

// breathingActivityRouter.get(
//     '/breathing-activities',
//     authMiddleware,
//     breathingActivityController.getAllBreathingActivities
// )
breathingActivityRouter.get(
    '/breathing-activities/:id',
    authMiddleware,
    breathingActivityController.getBreathingActivityById
)
breathingActivityRouter.post(
    '/breathing-activities',
    authMiddleware,
    breathingActivityController.createBreathingActivity
)
// breathingActivityRouter.put(
//     '/breathing-activities/:id',
//     authMiddleware,
//     breathingActivityController.updateBreathingActivity
// )
// breathingActivityRouter.delete(
//     '/breathing-activities/:id',
//     authMiddleware,
//     breathingActivityController.deleteBreathingActivity
// )

export default breathingActivityRouter
