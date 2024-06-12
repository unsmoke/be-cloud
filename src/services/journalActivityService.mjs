import { prismaClient } from '../app/db.mjs'
import { ResponseError } from '../utils/responseError.mjs'
import { errors } from '../utils/messageError.mjs'

const fetchAllJournalActivities = async () => {
    return prismaClient.journalActivity.findMany()
}

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

const createJournalActivity = async (data) => {
    return prismaClient.journalActivity.create({ data })
}

const updateJournalActivity = async (id, data) => {
    return prismaClient.journalActivity.update({
        where: { journal_id: parseInt(id) },
        data,
    })
}

const deleteJournalActivity = async (id) => {
    await prismaClient.journalActivity.delete({ where: { journal_id: parseInt(id) } })
}

export default {
    fetchAllJournalActivities,
    fetchJournalActivityById,
    createJournalActivity,
    updateJournalActivity,
    deleteJournalActivity,
}
