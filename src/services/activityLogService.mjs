import {prismaClient} from '../app/db.mjs'
import {ResponseError} from '../utils/responseError.mjs'
import {errors} from '../utils/messageError.mjs'

const fetchAllActivityLogs = async () => {
    return prismaClient.activityLog.findMany()
}

const fetchActivityLogById = async (id) => {
    const activityLog = await prismaClient.activityLog.findUnique({
        where: { activity_log_id: parseInt(id) },
    })
    if (!activityLog) {
        throw new ResponseError(
            errors.HTTP.CODE.NOT_FOUND,
            errors.HTTP.STATUS.NOT_FOUND,
            errors.GENERAL.NOT_FOUND
        )
    }
    return activityLog
}

const createActivityLog = async (data) => {
    return prismaClient.activityLog.create({ data })
}

const updateActivityLog = async (id, data) => {
    return prismaClient.activityLog.update({
        where: { activity_log_id: parseInt(id) },
        data,
    })
}

const deleteActivityLog = async (id) => {
    await prismaClient.activityLog.delete({ where: { activity_log_id: parseInt(id) } })
}

export default { fetchAllActivityLogs, fetchActivityLogById, createActivityLog, updateActivityLog, deleteActivityLog }
