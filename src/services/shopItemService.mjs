import { prismaClient } from '../app/db.mjs'
import dotenv from 'dotenv'

dotenv.config()

const fetchAllShopItems = async () => {
    return await prismaClient.shopItem.findMany()
}

const fetchShopItemDetail = async (user_id, item_id) => {
    return await prismaClient.shopItem.findUnique({
        where: {
            user_id_item_id: {
                user_id,
                item_id,
            },
        },
    })
}

const fetchShopItemsByUser = async (user_id) => {
    const shopItems = await prismaClient.shopItem.findMany({
        where: {
            user_id: user_id,
        },
        include: {
            item: true,
        },
    })

    return shopItems.map((item) => ({
        item_id: item.item.item_id,
        name: item.item.name,
        description: item.item.description,
        price: item.item.price,
        img_url: item.item.img_url,
        lung_url: item.item.lung_url,
        created_at: item.item.created_at,
        updated_at: item.item.updated_at,
    }))
}

const createShopItem = async (user_id, item_id) => {
    return await prismaClient.shopItem.create({
        data: {
            user_id,
            item_id,
        },
    })
}

const modifyShopItem = async (user_id, item_id, new_item_id) => {
    return await prismaClient.shopItem.update({
        where: {
            user_id_item_id: {
                user_id,
                item_id,
            },
        },
        data: {
            item_id: new_item_id,
        },
    })
}

const removeShopItem = async (user_id, item_id) => {
    return await prismaClient.shopItem.delete({
        where: {
            user_id_item_id: {
                user_id,
                item_id,
            },
        },
    })
}

export default {
    fetchAllShopItems,
    fetchShopItemDetail,
    fetchShopItemsByUser,
    createShopItem,
    modifyShopItem,
    removeShopItem,
}
