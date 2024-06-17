import { prismaClient } from '../app/db.mjs'
import { ResponseError } from '../utils/responseError.mjs'
import { errors } from '../utils/messageError.mjs'
import { validate } from '../validations/validation.mjs'
import { createBreathingActivitySchema } from '../validations/breathingActivityValidations.mjs'
import activityLogService from './activityLogService.mjs'
import { logger } from '../app/logging.mjs'

const fetchBreathingActivityById = async (id) => {
    const breathingActivity = await prismaClient.breathingActivity.findUnique({
        where: { breathing_id: parseInt(id) },
    })
    if (!breathingActivity) {
        throw new ResponseError(
            errors.HTTP.CODE.NOT_FOUND,
            errors.HTTP.STATUS.NOT_FOUND,
            errors.BREATHING_ACTIVITY.NOT_FOUND
        )
    }
    return breathingActivity
}

const createBreathingActivity = async (req) => {
    const { user_id, duration, reward, date } = validate(createBreathingActivitySchema, req.body)

    const user = await prismaClient.user.findUnique({
        where: { user_id },
    })

    if (!user) {
        throw new ResponseError(
            errors.HTTP.CODE.NOT_FOUND,
            errors.HTTP.STATUS.NOT_FOUND,
            errors.USER.NOT_FOUND
        )
    }

    const breathingActivity = await prismaClient.breathingActivity.create({
        data: {
            duration,
            reward,
        },
    })

    if (!breathingActivity) {
        throw new ResponseError(
            errors.HTTP.CODE.NOT_FOUND,
            errors.HTTP.STATUS.NOT_FOUND,
            errors.BREATHING_ACTIVITY.NOT_FOUND
        )
    }

    return activityLogService.createOrUpdateActivityLog({
        user_id,
        breathing_id: breathingActivity.breathing_id,
        reward,
        date,
    })
}

export default {
    fetchBreathingActivityById,
    createBreathingActivity,
}
