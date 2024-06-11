import { prismaClient } from '../app/db.mjs'
import dotenv from 'dotenv'

dotenv.config()

const fetchAllUserUserItems = async () => {
  return await prismaClient.userItem.findMany();
};

const fetchUserItemDetail = async (user_id, item_id) => {
  return await prismaClient.userItem.findUnique({
    where: {
      user_id_item_id: {
        user_id,
        item_id,
      },
    },
  });
};

const fetchUserInventory = async (user_id) => {
  const inventoryItems = await prismaClient.userItem.findMany({
    where: {
      user_id: user_id,
    },
    include: {
      item: true
    }
  });

  return inventoryItems.map(item => ({
    item_id: item.item.item_id,
    name: item.item.name,
    description: item.item.description,
    price: item.item.price,
    img_url: item.item.img_url,
    created_at: item.item.created_at,
    updated_at: item.item.updated_at,
  }));



};

const createUserItem = async (user_id, item_id) => {
  return await prismaClient.userItem.create({
    data: {
      user_id,
      item_id,
    },
  });
};

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
  });
};

const removeUserItem = async (user_id, item_id) => {
  return await prismaClient.userItem.delete({
    where: {
      user_id_item_id: {
        user_id,
        item_id,
      },
    },
  });
};

export default {
  fetchAllUserUserItems,
  fetchUserItemDetail,
  fetchUserInventory,
  createUserItem,
  modifyUserItem,
  removeUserItem,
};
