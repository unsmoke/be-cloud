import journalActivityService from '../services/journalActivityService.mjs'
import {responseSuccess} from '../utils/responseAPI.mjs'
import {success} from '../utils/messageSuccess.mjs'

const getAllJournalActivities = async (req, res, next) => {
    try {
        const result = await journalActivityService.fetchAllJournalActivities()
        res.status(success.HTTP.CODE.OK).send(
            responseSuccess(success.HTTP.CODE.OK, success.HTTP.STATUS.OK, result)
        )
    } catch (e) {
        next(e)
    }
}

const getJournalActivityById = async (req, res, next) => {
    try {
        const result = await journalActivityService.fetchJournalActivityById(req.params.id)
        res.status(success.HTTP.CODE.OK).send(
            responseSuccess(success.HTTP.CODE.OK, success.HTTP.STATUS.OK, result)
        )
    } catch (e) {
        next(e)
    }
}

const createJournalActivity = async (req, res, next) => {
    try {
        const result = await journalActivityService.createJournalActivity(req.body)
        res.status(success.HTTP.CODE.CREATED).send(
            responseSuccess(success.HTTP.CODE.CREATED, success.HTTP.STATUS.CREATED, result)
        )
    } catch (e) {
        next(e)
    }
}

const updateJournalActivity = async (req, res, next) => {
    try {
        const result = await journalActivityService.updateJournalActivity(req.params.id, req.body)
        res.status(success.HTTP.CODE.OK).send(
            responseSuccess(success.HTTP.CODE.OK, success.HTTP.STATUS.OK, result)
        )
    } catch (e) {
        next(e)
    }
}

const deleteJournalActivity = async (req, res, next) => {
    try {
        await journalActivityService.deleteJournalActivity(req.params.id)
        res.status(success.HTTP.CODE.OK).send()
    } catch (e) {
        next(e)
    }
}

export default { getAllJournalActivities, getJournalActivityById, createJournalActivity, updateJournalActivity, deleteJournalActivity }
