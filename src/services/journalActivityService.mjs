import { prismaClient } from '../app/db.mjs'
import { ResponseError } from '../utils/responseError.mjs'
import { errors } from '../utils/messageError.mjs'
import { validate } from '../validations/validation.mjs'
import {
    createJournalActivitySchema,
    activityLogIdSchema,
} from '../validations/journalActivityValidations.mjs'
import activityLogService from './activityLogService.mjs'
import { generateJournalResponse } from './geminiService.mjs'

const fetchJournalActivityById = async (req) => {
    const { id } = validate(activityLogIdSchema, req.params)

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

    const journalActivity = await prismaClient.journalActivity.create({
        data: {
            title,
            body,
            reward,
        },
    })

    await activityLogService.createOrUpdateActivityLog({
        user_id,
        journal_id: journalActivity.journal_id,
        reward,
        date,
    })

    return await generateJournalResponse()
}

export default {
    fetchJournalActivityById,
    createJournalActivity,
}
