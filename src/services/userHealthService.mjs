import { prismaClient } from '../app/db.mjs'
import dotenv from 'dotenv'
import { epochToIso } from '../utils/epochToIso.mjs'

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

const createUserHealth = async (data, user_id) => {
  if (data.date_of_birth) {
    data.date_of_birth = epochToIso(data.date_of_birth);
  }
  if (data.first_cigarette_date) {
    data.first_cigarette_date = epochToIso(data.first_cigarette_date);
  }

  
  await prismaClient.user.update({
    where: {
      user_id: user_id,
    },
    data: {
      province: data.province,
      city: data.city
    }
  });

  const { province, city, ...userHealthData } = data;

  const createdUserHealth = await prismaClient.userHealth.create({
    data: {
      ...userHealthData,
      user_id: user_id
    },
  });

  return createdUserHealth;
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
