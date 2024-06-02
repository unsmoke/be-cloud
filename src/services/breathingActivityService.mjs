import {prismaClient} from '../app/db.mjs'
import {ResponseError} from "../utils/responseError.mjs";
import {errors} from "../utils/messageError.mjs";

const getAll = async () => {
    return prismaClient.breathingActivity.findMany();
}

const getById = async (id) => {
    const breathingActivity = await prismaClient.breathingActivity.findUnique({ where: { breathing_id: parseInt(id) } })
    if (!breathingActivity) {
        throw new ResponseError(errors.HTTP.CODE.NOT_FOUND, errors.HTTP.STATUS.NOT_FOUND, errors.GENERAL.NOT_FOUND)
    }
    return breathingActivity
}

const create = async (data) => {
    return prismaClient.breathingActivity.create({data});
}

const update = async (id, data) => {
    return prismaClient.breathingActivity.update({
        where: {breathing_id: parseInt(id)},
        data
    });
}

const remove = async (id) => {
    await prismaClient.breathingActivity.delete({ where: { breathing_id: parseInt(id) } })
}

export default { getAll, getById, create, update, remove }
