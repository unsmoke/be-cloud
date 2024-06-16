import express from 'express'
import journalActivityController from '../controllers/journalActivityController.mjs'

const journalActivityRouter = express.Router()

// journalActivityRouter.get('/journal-activities', journalActivityController.getAllJournalActivities)
journalActivityRouter.get(
    '/journal-activities/:id',
    journalActivityController.getJournalActivityById
)
journalActivityRouter.post('/journal-activities', journalActivityController.createJournalActivity)
// journalActivityRouter.put(
//     '/journal-activities/:id',
//     journalActivityController.updateJournalActivity
// )
// journalActivityRouter.delete(
//     '/journal-activities/:id',
//     journalActivityController.deleteJournalActivity
// )

export default journalActivityRouter
