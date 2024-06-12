import { prismaClient } from '../app/db.mjs'
import dotenv from 'dotenv'
import { ResponseError } from '../utils/responseError.mjs'
import { errors } from '../utils/messageError.mjs'

dotenv.config()

const fetchAllItems = async () => {
    const items = await prismaClient.item.findMany()
    return { items }
}

const fetchItemDetail = async (requestItemId) => {
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

const createItem = async (itemData) => {
    const newItem = await prismaClient.item.create({
        data: itemData,
    })
    return { newItem }
}

const modifyItem = async (itemId, itemData) => {
    const updatedItem = await prismaClient.item.update({
        where: { item_id: itemId },
        data: itemData,
    })

    if (!updatedItem) {
        throw new ResponseError(
            errors.HTTP.CODE.BAD_REQUEST,
            errors.HTTP.STATUS.BAD_REQUEST,
            errors.ITEM.NOT_FOUND
        )
    }

    return { updatedItem }
}

const removeItem = async (itemId) => {
    const deletedItem = await prismaClient.item.delete({
        where: { item_id: itemId },
    })

    if (!deletedItem) {
        throw new ResponseError(
            errors.HTTP.CODE.BAD_REQUEST,
            errors.HTTP.STATUS.BAD_REQUEST,
            errors.ITEM.NOT_FOUND
        )
    }

    return { deletedItem }
}

export default { fetchAllItems, fetchItemDetail, createItem, modifyItem, removeItem }
