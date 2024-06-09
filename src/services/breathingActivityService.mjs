import {prismaClient} from '../app/db.mjs'
import {ResponseError} from '../utils/responseError.mjs'
import {errors} from '../utils/messageError.mjs'

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

const createBreathingActivity = async (data) => {
    return prismaClient.breathingActivity.create({ data })
}

const updateBreathingActivity = async (id, data) => {
    return prismaClient.breathingActivity.update({
        where: { breathing_id: parseInt(id) },
        data,
    })
}

const deleteBreathingActivity = async (id) => {
    await prismaClient.breathingActivity.delete({ where: { breathing_id: parseInt(id) } })
}

export default { fetchAllBreathingActivities, fetchBreathingActivityById, createBreathingActivity, updateBreathingActivity, deleteBreathingActivity }
