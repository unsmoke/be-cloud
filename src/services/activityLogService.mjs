import { prismaClient } from '../app/db.mjs'
import { ResponseError } from '../utils/responseError.mjs'
import { errors } from '../utils/messageError.mjs'
import { validate } from '../validations/validation.mjs'
import {
    activityLogIdSchema,
    getActivityLogSchema,
} from '../validations/activityLogValidations.mjs'

const fetchAllActivityLogs = async (req) => {
    const { page, size } = validate(getActivityLogSchema, req.query)
    const skip = (page - 1) * size

    return prismaClient.$transaction(async (prisma) => {
        const activityLogs = await prisma.activityLog.findMany({
            select: {
                activity_log_id: true,
                breathing_id: true,
                journal_id: true,
                date: true,
                created_at: true,
            },
            skip,
            take: size,
        })

        const totalItem = await prisma.activityLog.count()

        return {
            data: activityLogs,
            pagination: {
                page,
                skip,
                total_item: totalItem,
                total_page: Math.ceil(totalItem / size),
            },
        }
    })
}

const fetchActivityLogById = async (req) => {
    const { id } = validate(activityLogIdSchema, req.params)

    if (!parseInt(id)) {
        throw new ResponseError(
            errors.HTTP.CODE.BAD_REQUEST,
            errors.HTTP.STATUS.BAD_REQUEST,
            errors.ACTIVITY_LOG.ID.MUST_BE_VALID
        )
    }

    return prismaClient.$transaction(async (prisma) => {
        const result = await prisma.activityLog.findUnique({
            where: {
                activity_log_id: parseInt(id),
            },
            select: {
                activity_log_id: true,
                breathing_id: true,
                journal_id: true,
                date: true,
                created_at: true,
                updated_at: true,
                user: {
                    select: {
                        full_name: true,
                        username: true,
                        email: true,
                    },
                },
            },
        })

        if (!result) {
            throw new ResponseError(
                errors.HTTP.CODE.NOT_FOUND,
                errors.HTTP.STATUS.NOT_FOUND,
                errors.ACTIVITY_LOG.ID.NOT_FOUND
            )
        }

        return result
    })
}

const createOrUpdateActivityLog = async ({ user_id, breathing_id = 0, journal_id = 0, date }) => {
    if (breathing_id === 0 && journal_id === 0) {
        throw new ResponseError(
            errors.HTTP.CODE.BAD_REQUEST,
            errors.HTTP.STATUS.BAD_REQUEST,
            errors.ACTIVITY_LOG.BREATHING_JOURNAL.ID.CANNOT_BE_EMPTY
        )
    }

    if (breathing_id && journal_id) {
        throw new ResponseError(
            errors.HTTP.CODE.BAD_REQUEST,
            errors.HTTP.STATUS.BAD_REQUEST,
            errors.ACTIVITY_LOG.BREATHING_JOURNAL.ID.CANNOT_BE_DUPLICATE
        )
    }

    if (!user_id) {
        throw new ResponseError(
            errors.HTTP.CODE.BAD_REQUEST,
            errors.HTTP.STATUS.BAD_REQUEST,
            errors.ACTIVITY_LOG.USER_ID.CANNOT_BE_EMPTY
        )
    }

    if (!date) {
        throw new ResponseError(
            errors.HTTP.CODE.BAD_REQUEST,
            errors.HTTP.STATUS.BAD_REQUEST,
            errors.ACTIVITY_LOG.DATE.CANNOT_BE_EMPTY
        )
    }

    const dateObj = new Date(date * 1000)
    const startOfDayEpoch = Math.floor(dateObj.setHours(0, 0, 0, 0) / 1000)
    const endOfDayEpoch = Math.floor(dateObj.setHours(23, 59, 59, 999) / 1000)

    const data = {
        user_id,
        date,
        ...(breathing_id && { breathing_id }),
        ...(journal_id && { journal_id }),
    }

    return prismaClient.$transaction(async (prisma) => {
        const activityLog = await prisma.activityLog.upsert({
            where: {
                AND: [
                    { user_id },
                    {
                        date: {
                            gte: startOfDayEpoch,
                            lte: endOfDayEpoch,
                        },
                    },
                ],
            },
            update: data,
            create: data,
        })

        const user = await prisma.user.findUnique({ where: { user_id } })
        const userHealth = await prisma.userHealth.findUnique({ where: { user_id } })

        let updateData = { exp: user.exp }

        if (breathing_id && journal_id) {
            const cigarettesPerDay = userHealth.cigarettes_per_day
            const cigarettesAvoidedToday = cigarettesPerDay / 24 // Assuming even distribution of smoking throughout the day

            updateData = {
                ...updateData,
                streak_count: user.streak_count + 1,
                money_saved:
                    user.money_saved +
                    (userHealth.pack_price / userHealth.cigarettes_per_pack) *
                        cigarettesAvoidedToday,
                cigarettes_avoided: user.cigarettes_avoided + cigarettesAvoidedToday,
                cigarettes_quota: [...user.cigarettes_quota, Math.floor(cigarettesAvoidedToday)],
            }
        } else if (breathing_id || journal_id) {
            updateData.exp += 10 // Example value
        }

        await prisma.user.update({
            where: { user_id },
            data: updateData,
        })

        return activityLog
    })
}

const deleteActivityLog = async (req) => {
    const { id } = validate(activityLogIdSchema, req.params)

    if (!parseInt(id)) {
        throw new ResponseError(
            errors.HTTP.CODE.BAD_REQUEST,
            errors.HTTP.STATUS.BAD_REQUEST,
            errors.ACTIVITY_LOG.ID.MUST_BE_VALID
        )
    }

    return prismaClient.$transaction(async (prisma) => {
        const activityLog = await prisma.activityLog.findUnique({
            where: { activity_log_id: parseInt(id) },
        })

        if (!activityLog) {
            throw new ResponseError(
                errors.HTTP.CODE.NOT_FOUND,
                errors.HTTP.STATUS.NOT_FOUND,
                errors.ACTIVITY_LOG.ID.NOT_FOUND
            )
        }

        return prisma.activityLog.delete({ where: { activity_log_id: parseInt(id) } })
    })
}

export default {
    fetchAllActivityLogs,
    fetchActivityLogById,
    createOrUpdateActivityLog,
    deleteActivityLog,
}
