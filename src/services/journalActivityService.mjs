import { prismaClient } from '../app/db.mjs'
import { ResponseError } from '../utils/responseError.mjs'
import { errors } from '../utils/messageError.mjs'
import { validate } from 'uuid'
import { createJournalActivitySchema } from '../validations/journalActivityValidations.mjs'
import activityLogService from './activityLogService.mjs'

const fetchJournalActivityById = async (id) => {
    const journalActivity = await prismaClient.journalActivity.findUnique({
        where: { journal_id: parseInt(id) },
    })
    if (!journalActivity) {
        throw new ResponseError(
            errors.HTTP.CODE.NOT_FOUND,
            errors.HTTP.STATUS.NOT_FOUND,
            errors.GENERAL.NOT_FOUND
        )
    }
    return journalActivity
}

const createJournalActivity = async (req) => {
    const { title, body, reward, user_id, date } = validate(createJournalActivitySchema, req.body)

    return prismaClient.$transaction(async (prisma) => {
        const journalActivity = await prisma.journalActivity.create({
            data: {
                title,
                body,
                reward,
            },
        })

        await activityLogService.createOrUpdateActivityLog({
            user_id,
            journal_id: journalActivity.journal_id,
            date,
        })

        return journalActivity
    })
}

export default {
    fetchJournalActivityById,
    createJournalActivity,
}
