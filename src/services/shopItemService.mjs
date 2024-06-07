import { prismaClient } from '../app/db.mjs'
import dotenv from 'dotenv'

dotenv.config()

const fetchAllShopItems = async () => {
  return await prismaClient.shopItem.findMany();
};

const fetchShopItemDetail = async (user_id, item_id) => {
  return await prismaClient.shopItem.findUnique({
    where: {
      user_id_item_id: {
        user_id,
        item_id,
      },
    },
  });
};

const fetchShopItemsByUser = async (user_id) => {
  return await prismaClient.shopItem.findMany({
    where: {
      user_id: user_id,
    },
  });
};

const createShopItem = async (user_id, item_id) => {
  return await prismaClient.shopItem.create({
    data: {
      user_id,
      item_id,
    },
  });
};

const updateShopItem = async (user_id, item_id, new_item_id) => {
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
  });
};

const deleteShopItem = async (user_id, item_id) => {
  return await prismaClient.shopItem.delete({
    where: {
      user_id_item_id: {
        user_id,
        item_id,
      },
    },
  });
};

export default {
  fetchAllShopItems,
  fetchShopItemDetail,
  fetchShopItemsByUser,
  createShopItem,
  updateShopItem,
  deleteShopItem,
};
