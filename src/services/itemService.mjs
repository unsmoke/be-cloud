import { prismaClient } from '../app/db.mjs'
import dotenv from 'dotenv'
import { ResponseError } from '../utils/responseError.mjs'
import { errors } from '../utils/messageError.mjs'

dotenv.config()

const getAllItem = async () => {
    const items = await prismaClient.item.findMany()

    return { items }
}

const getItemDetail = async (requestItemId) => {
    const item = await prismaClient.item.findUnique({
        where: { item_id: requestItemId },
    })

    if (!item) {
        throw new ResponseError(
            errors.HTTP.CODE.BAD_REQUEST,
            errors.HTTP.STATUS.BAD_REQUEST,
            errors.ITEM.NOT_FOUND
        )
    }

    return { item }
}

export default { getItemDetail, getAllItem }
