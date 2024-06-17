import activityLogService from '../services/activityLogService.mjs'
import { responseSuccess } from '../utils/responseAPI.mjs'
import { success } from '../utils/messageSuccess.mjs'

const getActivityLogByUserId = async (req, res, next) => {
    try {
        const result = await activityLogService.fetchActivityLogByUserId(req)
        res.status(success.HTTP.CODE.OK).send(
            responseSuccess(success.HTTP.CODE.OK, success.HTTP.STATUS.OK, result)
        )
    } catch (e) {
        next(e)
    }
}

export default {
    getActivityLogByUserId,
}
