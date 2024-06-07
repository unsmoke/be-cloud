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
  createUserItem,
  modifyUserItem,
  removeUserItem,
};
