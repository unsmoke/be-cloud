import { prismaClient } from '../app/db.mjs'
import { ResponseError } from '../utils/responseError.mjs'
import { errors } from '../utils/messageError.mjs'
import { validate } from '../validations/validation.mjs'
import {
    activityLogIdSchema,
    getActivityLogSchema,
} from '../validations/activityLogValidations.mjs'

const fetchActivityLogByUsedId = async (req) => {
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

const createOrUpdateActivityLog = async ({
    user_id,
    breathing_id = 0,
    journal_id = 0,
    reward = 0,
    date,
}) => {
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
    const startOfDay = new Date(dateObj.setHours(0, 0, 0, 0))
    const endOfDay = new Date(dateObj.setHours(23, 59, 59, 999))

    const data = {
        user_id,
        date: dateObj,
        ...(breathing_id && { breathing_id }),
        ...(journal_id && { journal_id }),
        created_at: new Date(),
        updated_at: new Date(),
    }

    return prismaClient.$transaction(async (prisma) => {
        const userActivityLog = await prisma.activityLog.findFirst({
            where: {
                user_id,
                date: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
            },
            select: {
                activity_log_id: true,
                breathing_id: true,
                journal_id: true,
            },
        })

        if (!userActivityLog) {
            await prisma.activityLog.create({
                data: {
                    ...data,
                },
            })
        } else {
            await prisma.activityLog.update({
                where: { activity_log_id: userActivityLog.activity_log_id },
                data,
            })
        }

        const user = await prisma.user.findUnique({ where: { user_id } })
        const userHealth = await prisma.userHealth.findUnique({ where: { user_id } })

        let updateData = { exp: user.exp }

        if (userActivityLog.breathing_id && userActivityLog.journal_id) {
            const cigarettesPerDay = userHealth.cigarettes_per_day
            const cigarettesAvoidedToday = cigarettesPerDay / 24

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
        } else if (userActivityLog.breathing_id || userActivityLog.journal_id) {
            updateData.exp += reward
        }

        return prisma.user.update({
            where: { user_id },
            data: updateData,
            select: {
                username: true,
                exp: true,
                streak_count: true,
            },
        })
    })
}

export default {
    fetchActivityLogByUsedId,
    createOrUpdateActivityLog,
}
