import { prismaClient } from '../app/db.mjs'
import dotenv from 'dotenv'

dotenv.config()

const fetchAllUserHealth = async () => {
  return await prismaClient.userHealth.findMany();
};

const fetchUserHealthDetail = async (user_id) => {
  return await prismaClient.userHealth.findUnique({
    where: {
      user_id: user_id,
    },
  });
};

const createUserHealth = async (data) => {
  return await prismaClient.userHealth.create({
    data: data,
  });
};

const updateUserHealth = async (user_id, data) => {
  return await prismaClient.userHealth.update({
    where: {
      user_id: user_id,
    },
    data: data,
  });
};

const deleteUserHealth = async (user_id) => {
  return await prismaClient.userHealth.delete({
    where: {
      user_id: user_id,
    },
  });
};


export default {
  fetchAllUserHealth,
  fetchUserHealthDetail,
  createUserHealth,
  updateUserHealth,
  deleteUserHealth,
};
