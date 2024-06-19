import { PrismaClient } from '@prisma/client'
import { ResponseError } from '../utils/responseError.mjs'
import { errors } from '../utils/messageError.mjs'
import { createRelapseSchema } from '../validations/relapseValidation.mjs'
import { validate } from '../validations/validation.mjs'

const prisma = new PrismaClient()

const handleRelapse = async (req) => {
    const { reward, cigarettes_this_day, user_id, date } = validate(createRelapseSchema, req.body)

    const user = await prisma.user.findUnique({
        where: { user_id },
    })

    if (!user) {
        throw new ResponseError(
            errors.HTTP.CODE.NOT_FOUND,
            errors.HTTP.STATUS.NOT_FOUND,
            errors.USER.NOT_FOUND
        )
    }

    const dateObj = new Date(date * 1000)
    const startOfDay = new Date(dateObj.setHours(0, 0, 0, 0))
    const endOfDay = new Date(dateObj.setHours(23, 59, 59, 999))

    return prisma.$transaction(async (prisma) => {
        const activityLog = await prisma.activityLog.findFirst({
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

        if (!activityLog || !activityLog.activity_log_id) {
            throw new ResponseError(
                errors.HTTP.CODE.NOT_FOUND,
                errors.HTTP.STATUS.NOT_FOUND,
                errors.RELAPSE.NO_ACTIVITY
            )
        }

        const checkCigaretteUserQuota = await prisma.user.findFirst({
            where: {
                user_id,
            },
            select: {
                cigarettes_quota: true,
            },
        })

        const cigaretteQuotaThisDay = checkCigaretteUserQuota.cigarettes_quota[0]
        const updatedCigarettesQuota = [...checkCigaretteUserQuota.cigarettes_quota]
        updatedCigarettesQuota.shift()
        const cigarettesAvoidedToday = cigaretteQuotaThisDay - cigarettes_this_day
        const moneySavedToday =
            (cigarettesAvoidedToday / userHealth.cigarettes_per_pack) * userHealth.pack_price

        const userHealth = await prisma.userHealth.findUnique({
            where: { user_id },
            select: {
                cigarettes_per_day: true,
                cigarettes_per_pack: true,
                pack_price: true,
            },
        })

        if (!userHealth) {
            throw new ResponseError(
                errors.HTTP.CODE.NOT_FOUND,
                errors.HTTP.STATUS.NOT_FOUND,
                errors.RELAPSE.NO_USER_HEALTH
            )
        }

        if (!activityLog.breathing_id || !activityLog.journal_id) {
            return await prisma.user.update({
                where: { user_id },
                data: {
                    streak_count: 0,
                    money_saved: user.money_saved + moneySavedToday,
                    cigarettes_avoided: user.cigarettes_avoided + cigarettesAvoidedToday,
                },
                select: {
                    streak_count: true,
                },
            })
        }

        if (cigarettes_this_day > cigaretteQuotaThisDay) {
            return await prisma.user.update({
                where: { user_id },
                data: {
                    streak_count: 0,
                    money_saved: user.money_saved + moneySavedToday,
                    cigarettes_avoided: user.cigarettes_avoided + cigarettesAvoidedToday,
                },
            })
        }

        return await prisma.user.update({
            where: { user_id },
            data: {
                streak_count: user.streak_count + 1,
                money_saved: user.money_saved + moneySavedToday,
                cigarettes_avoided: user.cigarettes_avoided + cigarettesAvoidedToday,
                exp: user.exp + reward,
                cigarettes_quota: updatedCigarettesQuota,
                current_day: user.current_day + 1,
            },
            select: {
                streak_count: true,
            },
        })
    })
}

export default {
    handleRelapse,
}
