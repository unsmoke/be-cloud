import journalActivityService from '../services/journalActivityService.mjs'
import { responseSuccess } from '../utils/responseAPI.mjs'
import { success } from '../utils/messageSuccess.mjs'

const getJournalActivityById = async (req, res, next) => {
    try {
        const result = await journalActivityService.fetchJournalActivityById(req)
        res.status(success.HTTP.CODE.OK).send(
            responseSuccess(success.HTTP.CODE.OK, success.HTTP.STATUS.OK, result)
        )
    } catch (e) {
        next(e)
    }
}

const createJournalActivity = async (req, res, next) => {
    try {
        const result = await journalActivityService.createJournalActivity(req)
        res.status(success.HTTP.CODE.CREATED).send(
            responseSuccess(success.HTTP.CODE.CREATED, success.HTTP.STATUS.CREATED, result)
        )
    } catch (e) {
        next(e)
    }
}

export default {
    getJournalActivityById,
    createJournalActivity,
}
