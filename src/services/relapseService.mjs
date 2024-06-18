import { PrismaClient } from '@prisma/client'
import { ResponseError } from '../utils/responseError.mjs'
import { errors } from '../utils/messageError.mjs'
import { createRelapseSchema } from '../validations/relapseValidation.mjs'
import { validate } from '../validations/validation.mjs'
import { logger } from '../app/logging.mjs'

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
                breathing_id: true,
                journal_id: true,
            },
        })

        if (!activityLog.breathing_id || !activityLog.journal_id) {
            throw new ResponseError(
                errors.HTTP.CODE.NOT_FOUND,
                errors.HTTP.STATUS.NOT_FOUND,
                'there is no breathing activity or journal activity in this date'
            )
        }

        const checkCigaretteThisDay = await prisma.user.findFirst({
            where: {
                user_id,
            },
            select: {
                cigarettes_quota: true,
            },
        })

        const cigaretteQuotaThisDay = checkCigaretteThisDay.cigarettes_quota[0]

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
                'User health record not found'
            )
        }

        if (
            !activityLog.breathing_id ||
            !activityLog.journal_id ||
            cigarettes_this_day > cigaretteQuotaThisDay
        ) {
            // update the streak for the user to 0
            await prisma.user.update({
                where: { user_id },
                data: {
                    streak: 0,
                },
            })
            return
        } else {
            const updatedCigarettesQuota = [...checkCigaretteThisDay.cigarettes_quota]
            updatedCigarettesQuota.shift()
            const cigarettesAvoidedToday = cigaretteQuotaThisDay - cigarettes_this_day
            const moneySavedToday =
                (userHealth.cigarettes_per_pack / userHealth.pack_price) * cigarettesAvoidedToday

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
            })
        }
    })
}

export default {
    handleRelapse,
}
