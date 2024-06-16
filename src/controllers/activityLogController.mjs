import activityLogService from '../services/activityLogService.mjs'
import { responseSuccess } from '../utils/responseAPI.mjs'
import { success } from '../utils/messageSuccess.mjs'

const getAllActivityLogs = async (req, res, next) => {
    try {
        const result = await activityLogService.fetchAllActivityLogs()
        res.status(success.HTTP.CODE.OK).send(
            responseSuccess(success.HTTP.CODE.OK, success.HTTP.STATUS.OK, result)
        )
    } catch (e) {
        next(e)
    }
}

const getActivityLogById = async (req, res, next) => {
    try {
        const result = await activityLogService.fetchActivityLogById(req.params.id)
        res.status(success.HTTP.CODE.OK).send(
            responseSuccess(success.HTTP.CODE.OK, success.HTTP.STATUS.OK, result)
        )
    } catch (e) {
        next(e)
    }
}

const createActivityLog = async (req, res, next) => {
    try {
        const result = await activityLogService.createOrUpdateActivityLog(req.body)
        res.status(success.HTTP.CODE.CREATED).send(
            responseSuccess(success.HTTP.CODE.CREATED, success.HTTP.STATUS.CREATED, result)
        )
    } catch (e) {
        next(e)
    }
}

const deleteActivityLog = async (req, res, next) => {
    try {
        await activityLogService.deleteActivityLog(req.params.id)
        res.status(success.HTTP.CODE.NO_CONTENT).send()
    } catch (e) {
        next(e)
    }
}

export default {
    getAllActivityLogs,
    getActivityLogById,
    createActivityLog,
    deleteActivityLog,
}
