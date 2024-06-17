import breathingActivityService from '../services/breathingActivityService.mjs'
import { responseSuccess } from '../utils/responseAPI.mjs'
import { success } from '../utils/messageSuccess.mjs'

const getBreathingActivityById = async (req, res, next) => {
    try {
        const result = await breathingActivityService.fetchBreathingActivityById(req.params.id)
        res.status(success.HTTP.CODE.OK).send(
            responseSuccess(success.HTTP.CODE.OK, success.HTTP.STATUS.OK, result)
        )
    } catch (e) {
        next(e)
    }
}

const createBreathingActivity = async (req, res, next) => {
    try {
        const result = await breathingActivityService.createBreathingActivity(req)
        res.status(success.HTTP.CODE.CREATED).send(
            responseSuccess(success.HTTP.CODE.CREATED, success.HTTP.STATUS.CREATED, result)
        )
    } catch (e) {
        next(e)
    }
}

export default {
    getBreathingActivityById,
    createBreathingActivity,
}
