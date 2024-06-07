import express from 'express'
import breathingActivityController from '../controllers/breathingActivityController.mjs'

const breathingActivityRouter = express.Router()

breathingActivityRouter.get('/', breathingActivityController.getAll)
breathingActivityRouter.get('/:id', breathingActivityController.getById)
breathingActivityRouter.post('/', breathingActivityController.create)
breathingActivityRouter.put('/:id', breathingActivityController.update)
breathingActivityRouter.delete('/:id', breathingActivityController.remove)

export default breathingActivityRouter
