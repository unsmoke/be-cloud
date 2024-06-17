import { prismaClient } from '../app/db.mjs'
import dotenv from 'dotenv'

dotenv.config()

const fetchAllUserUserItems = async () => {
    return await prismaClient.userItem.findMany()
}

const fetchUserItemDetail = async (user_id, item_id) => {
    return await prismaClient.userItem.findUnique({
        where: {
            user_id_item_id: {
                user_id,
                item_id,
            },
        },
    })
}

const fetchUserInventory = async (user_id) => {
    const inventoryItems = await prismaClient.userItem.findMany({
        where: {
            user_id: user_id,
        },
        include: {
            item: true,
        },
    })

    return inventoryItems.map((item) => ({
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

const createUserItem = async (user_id, item_id) => {
    const user = await prismaClient.user.findUnique({
        where: { user_id: user_id },
        select: { balance_coin: true },
    })

    if (!user) {
        throw new Error('User not found')
    }

    const item = await prismaClient.item.findUnique({
        where: { item_id: item_id },
        select: { price: true },
    })

    if (!item) {
        throw new Error('Item not found')
    }

    const itemExists = await prismaClient.shopItem.findUnique({
        where: {
            user_id_item_id: {
                user_id: user_id,
                item_id: item_id,
            },
        },
    })

    if (!itemExists) {
        throw new Error("Item not found in user's shop")
    }

    const itemCost = item.price

    if (user.balance_coin < itemCost) {
        throw new Error('Insufficient balance')
    }

    await prismaClient.user.update({
        where: { user_id: user_id },
        data: {
            balance_coin: {
                decrement: itemCost,
            },
        },
    })

    await prismaClient.shopItem.delete({
        where: {
            user_id_item_id: {
                user_id: user_id,
                item_id: item_id,
            },
        },
    })

    return await prismaClient.userItem.create({
        data: {
            user_id,
            item_id,
        },
    })
}

const attachUserItem = async (user_id, item_id) => {
    if (item_id === '00000000-0000-4000-8000-000000000000') {
        const user = await prismaClient.user.update({
            where: { user_id: user_id },
            data: {
                current_lung: 'https://storage.googleapis.com/unsmoke-assets/lungs/plain-lung.svg',
            },
            select: {
                user_id: true,
                username: true,
            },
        })

        return {
            user_id: user.user_id,
            username: user.username,
            current_lung: 'https://storage.googleapis.com/unsmoke-assets/lungs/plain-lung.svg',
            item_id: '00000000-0000-4000-8000-000000000000',
            item_name: 'Plain Lung',
            description: 'Plain lung',
        }
    }

    const userItem = await prismaClient.userItem.findUnique({
        where: {
            user_id_item_id: {
                user_id: user_id,
                item_id: item_id,
            },
        },
    })

    if (!userItem) {
        throw new Error('User does not have the item')
    }

    const item = await prismaClient.item.findUnique({
        where: {
            item_id: item_id,
        },
    })

    const user = await prismaClient.user.update({
        where: { user_id: user_id },
        data: {
            current_lung: item.lung_url,
        },
        select: {
            user_id: true,
            username: true,
            current_lung: true,
        },
    })

    return {
        user_id: user.user_id,
        username: user.username,
        current_lung: user.current_lung,
        item_id: userItem.item_id,
        item_name: userItem.name,
        description: userItem.description,
    }
}

const modifyUserItem = async (user_id, item_id, new_item_id) => {
    return await prismaClient.userItem.update({
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

const removeUserItem = async (user_id, item_id) => {
    return await prismaClient.userItem.delete({
        where: {
            user_id_item_id: {
                user_id,
                item_id,
            },
        },
    })
}

export default {
    fetchAllUserUserItems,
    fetchUserItemDetail,
    fetchUserInventory,
    createUserItem,
    modifyUserItem,
    removeUserItem,
    attachUserItem,
}
