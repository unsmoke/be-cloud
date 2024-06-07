import express from 'express'
import journalActivityController from '../controllers/journalActivityController.mjs'

const journalActivityRouter = express.Router()

journalActivityRouter.get('/', journalActivityController.getAll)
journalActivityRouter.get('/:id', journalActivityController.getById)
journalActivityRouter.post('/', journalActivityController.create)
journalActivityRouter.put('/:id', journalActivityController.update)
journalActivityRouter.delete('/:id', journalActivityController.remove)

export default journalActivityRouter
