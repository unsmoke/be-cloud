import express from 'express'
import journalActivityController from '../controllers/journalActivityController.mjs'
import authMiddleware from '../middlewares/authMiddleware.mjs'

const journalActivityRouter = express.Router()

journalActivityRouter.get(
    '/journal-activities/:id',
    authMiddleware,
    journalActivityController.getJournalActivityById
)
journalActivityRouter.post(
    '/journal-activities',
    authMiddleware,
    journalActivityController.createJournalActivity
)

export default journalActivityRouter
