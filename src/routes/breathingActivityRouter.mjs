import express from 'express'
import breathingActivityController from '../controllers/breathingActivityController.mjs'
import authMiddleware from '../middlewares/authMiddleware.mjs'

const breathingActivityRouter = express.Router()

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

export default breathingActivityRouter
