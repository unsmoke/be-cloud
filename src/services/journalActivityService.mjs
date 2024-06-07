import { prismaClient } from '../app/db.mjs'
import { ResponseError } from '../utils/responseError.mjs'
import { errors } from '../utils/messageError.mjs'

const getAll = async () => {
    return prismaClient.journalActivity.findMany()
}

const getById = async (id) => {
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

const create = async (data) => {
    return prismaClient.journalActivity.create({ data })
}

const update = async (id, data) => {
    return prismaClient.journalActivity.update({
        where: { journal_id: parseInt(id) },
        data,
    })
}

const remove = async (id) => {
    await prismaClient.journalActivity.delete({ where: { journal_id: parseInt(id) } })
}

export default { getAll, getById, create, update, remove }
