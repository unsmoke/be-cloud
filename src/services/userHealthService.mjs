import { prismaClient } from '../app/db.mjs'
import dotenv from 'dotenv'
import { epochToIso } from '../utils/epochToIso.mjs'
import { loadModel, predict } from '../utils/personalizationModel.mjs';
import { calculateAgeFromEpoch } from '../utils/calculateAgeFromEpoch.mjs';
import { geneticAlgorithm } from '../utils/geneticAlgo.mjs';

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
  const ageInYears = calculateAgeFromEpoch(data.date_of_birth);
  const smokingYears = calculateAgeFromEpoch(data.first_cigarette_date);

  if (isNaN(ageInYears) || isNaN(smokingYears)) {
    throw new Error("Invalid dates provided");
  }

  let predictions;
  // model
  try {
    await loadModel();
    const inputData = [
      data.cigarettes_per_day,
      data.smoking_start_time,
      data.is_nicotine_med ? 1 : 0,
      !data.is_nicotine_med ? 1 : 0,
      data.is_e_cigarette === 1 ? 1 : 0,
      data.is_e_cigarette === 2 ? 1 : 0,
      data.is_e_cigarette === 3 ? 1 : 0,
      data.is_e_cigarette === 4 ? 1 : 0,
      data.gender === "Male" ? 1 : 0,
      data.gender === "Female" ? 1 : 0,
      ageInYears,
      smokingYears,
      data.is_depressed ? 1 : 0,
      !data.is_depressed ? 1 : 0,
      data.is_other_tobacco === 1 ? 1 : 0,
      data.is_other_tobacco === 2 ? 1 : 0,
      data.is_other_tobacco === 3 ? 1 : 0,
      data.is_other_tobacco === 4 ? 1 : 0,
      data.is_spirit ? 1 : 0,
      !data.is_spirit ? 1 : 0,
      data.last_7_days ? 1 : 0,
      !data.last_7_days ? 1 : 0,
    ];
    console.log("inputData: ", inputData);
    predictions = await predict(inputData);
    console.log(predictions);

    if (!(predictions instanceof Float32Array)) {
      throw new Error("Invalid predictions format");
    }
  } catch (error) {
    throw new Error("Prediction Failed Please Try Again Later");
  }

  // Convert Float32Array to a regular array
  predictions = Array.from(predictions);

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
      city: data.city,
    },
  });

  const { province, city, ...userHealthData } = data;

  await prismaClient.userHealth.create({
    data: {
      ...userHealthData,
      user_id: user_id,
    },
  });

  const optimalPlanIndex = predictions.reduce((closestIndex, currentValue, currentIndex, array) => {
    return Math.abs(currentValue - 1) < Math.abs(array[closestIndex] - 1) ? currentIndex : closestIndex;
  }, 0);

  for (let i = 0; i < predictions.length; i++) {
    const dayCount = i === 0 ? 30 : i === 1 ? 90 : 180;
    const cigarettesQuotaGeneration = await geneticAlgorithm(1000, 100, dayCount, data.cigarettes_per_day, 0);
    await prismaClient.userPlan.create({
      data: {
        user_id: user_id,
        duration: dayCount,
        probability: predictions[i],
        original_cigarettes_quota: cigarettesQuotaGeneration,
        is_active: optimalPlanIndex === i,
      },
    });
  }

  return predictions;
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
