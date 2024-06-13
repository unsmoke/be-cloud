import { PrismaClient } from '@prisma/client'
import { ResponseError } from '../utils/responseError.mjs'
import { errors } from '../utils/messageError.mjs'
import { createRelapseSchema } from '../validations/relapseValidation.mjs'
import { validate } from 'uuid'

const prisma = new PrismaClient()

const handleRelapse = async (req) => {
    // Validate the input
    const { error, value } = validate(createRelapseSchema, req.body)

    if (error) {
        throw new ResponseError(
            errors.HTTP.CODE.BAD_REQUEST,
            errors.HTTP.STATUS.BAD_REQUEST,
            error.details[0].message
        )
    }

    const { user_id, date } = value
    const dateObj = new Date(date * 1000)

    // Check if the user exists
    const user = await prisma.user.findUnique({ where: { user_id } })
    if (!user) {
        throw new ResponseError(
            errors.HTTP.CODE.NOT_FOUND,
            errors.HTTP.STATUS.NOT_FOUND,
            errors.RELAPSE.USER_NOT_FOUND
        )
    }

    // Check if there are 2 relapse records in a 2-day period
    const twoDaysAgo = new Date(dateObj)
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)
    const relapses = await prisma.userRelapse.findMany({
        where: {
            user_id,
            date: {
                gte: twoDaysAgo,
                lte: dateObj,
            },
        },
    })

    if (relapses.length >= 2) {
        // Reset streak count and update cigarettes quota
        const userPlan = await prisma.userPlan.findFirst({
            where: { user_id, is_active: true },
        })

        if (!userPlan) {
            throw new ResponseError(
                errors.HTTP.CODE.NOT_FOUND,
                errors.HTTP.STATUS.NOT_FOUND,
                errors.RELAPSE.PLAN_NOT_FOUND
            )
        }

        await prisma.user.update({
            where: { user_id },
            data: {
                streak_count: 0,
                cigarettes_quota: userPlan.original_cigarettes_quota,
            },
        })
    }

    // Create a new relapse record
    await prisma.userRelapse.create({
        data: {
            user_id,
            date: dateObj,
        },
    })

    return { message: 'Relapse recorded successfully' }
}

export default {
    handleRelapse,
}
