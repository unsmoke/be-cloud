import express from 'express'
import breathingActivityController from '../controllers/breathingActivityController.mjs'

const breathingActivityRouter = express.Router()

breathingActivityRouter.get('/breathing-activities', breathingActivityController.getAllBreathingActivities)
breathingActivityRouter.get('/breathing-activities/:id', breathingActivityController.getBreathingActivityById)
breathingActivityRouter.post('/breathing-activities', breathingActivityController.createBreathingActivity)
breathingActivityRouter.put('/breathing-activities/:id', breathingActivityController.updateBreathingActivity)
breathingActivityRouter.delete('/breathing-activities/:id', breathingActivityController.deleteBreathingActivity)

export default breathingActivityRouter
