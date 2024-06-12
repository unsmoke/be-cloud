import { prismaClient } from '../app/db.mjs'
import { ResponseError } from '../utils/responseError.mjs'
import { errors } from '../utils/messageError.mjs'
import { validate } from '../validations/validation.mjs'
import { createBreathingActivitySchema } from '../validations/breathingActivityValidations.mjs'
import activityLogService from './activityLogService.mjs'

const fetchAllBreathingActivities = async () => {
    return prismaClient.breathingActivity.findMany()
}

const fetchBreathingActivityById = async (id) => {
    const breathingActivity = await prismaClient.breathingActivity.findUnique({
        where: { breathing_id: parseInt(id) },
    })
    if (!breathingActivity) {
        throw new ResponseError(
            errors.HTTP.CODE.NOT_FOUND,
            errors.HTTP.STATUS.NOT_FOUND,
            errors.GENERAL.NOT_FOUND
        )
    }
    return breathingActivity
}

const createBreathingActivity = async (req) => {
    const { user_id, duration, reward, date } = validate(createBreathingActivitySchema, req.body)

    return prismaClient.$transaction(async (prisma) => {
        const breathingActivity = await prisma.breathingActivity.create({
            data: {
                user_id,
                duration,
                reward,
                date,
            },
        })

        await activityLogService.createOrUpdateActivityLog({
            user_id,
            breathing_id: breathingActivity.breathing_id,
            date,
        })

        return breathingActivity
    })
}

const updateBreathingActivity = async (id, data) => {
    const breathingActivity = prismaClient.breathingActivity.update({
        where: { breathing_id: parseInt(id) },
        data,
    })

    return breathingActivity
}

const deleteBreathingActivity = async (id) => {
    await prismaClient.breathingActivity.delete({ where: { breathing_id: parseInt(id) } })
}

export default {
    fetchAllBreathingActivities,
    fetchBreathingActivityById,
    createBreathingActivity,
    updateBreathingActivity,
    deleteBreathingActivity,
}
