import userMilestoneService from '../services/userMilestoneService.mjs'
import { responseSuccess } from '../utils/responseAPI.mjs'
import { success } from '../utils/messageSuccess.mjs'

const getMilestoneDetail = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await userMilestoneService.fetchMilestoneDetail(id)
        res.status(success.HTTP.CODE.OK).send(
            responseSuccess(success.HTTP.CODE.OK, success.HTTP.STATUS.OK, result)
        )
    } catch (error) {
        next(error)
    }
}

const createNewMilestone = async (req, res, next) => {
    try {
        const result = await userMilestoneService.createMilestone(req)
        res.status(success.HTTP.CODE.OK).send(
            responseSuccess(success.HTTP.CODE.OK, success.HTTP.STATUS.OK, result)
        )
    } catch (error) {
        next(error)
    }
}

export default {
    getMilestoneDetail,
    createNewMilestone,
}
