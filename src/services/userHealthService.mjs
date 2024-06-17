import { prismaClient } from '../app/db.mjs'
import dotenv from 'dotenv'
import { epochToIso } from '../utils/epochToIso.mjs'
import { loadModel, predict } from '../utils/personalizationModel.mjs'
import { calculateAgeFromEpoch } from '../utils/calculateAgeFromEpoch.mjs'
import { geneticAlgorithm } from '../utils/geneticAlgo.mjs'

dotenv.config()

const fetchAllUserHealth = async () => {
    return await prismaClient.userHealth.findMany()
}

const fetchUserHealthDetail = async (user_id) => {
    return await prismaClient.userHealth.findUnique({
        where: {
            user_id: user_id,
        },
    })
}

const createUserHealth = async (data, user_id) => {
    const ageInYears = calculateAgeFromEpoch(parseInt(data.date_of_birth))
    const smokingYears = calculateAgeFromEpoch(parseInt(data.first_cigarette_date))

    if (isNaN(ageInYears) || isNaN(smokingYears)) {
        throw new Error('Invalid dates provided')
    }

    let predictions

    try {
        await loadModel()
        const inputData = [
            parseInt(data.cigarettes_per_day),
            parseInt(data.smoking_start_time),
            data.is_nicotine_med ? 1 : 0,
            !data.is_nicotine_med ? 1 : 0,
            data.is_e_cigarette === 1 ? 1 : 0,
            data.is_e_cigarette === 2 ? 1 : 0,
            data.is_e_cigarette === 3 ? 1 : 0,
            data.is_e_cigarette === 4 ? 1 : 0,
            data.gender === 'Male' ? 1 : 0,
            data.gender === 'Female' ? 1 : 0,
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
        ]

        predictions = await predict(inputData)

        if (!(predictions instanceof Float32Array)) {
            throw new Error('Invalid predictions format')
        }
    } catch (error) {
        throw new Error('Prediction Failed Please Try Again Later')
    }

    predictions = Array.from(predictions)

    await prismaClient.user.update({
        where: {
            user_id: user_id,
        },
        data: {
            province: data.province,
            city: data.city,
        },
    })

    const { province, city, ...userHealthData } = data

    const processedData = {
        ...userHealthData,
        date_of_birth: epochToIso(parseInt(userHealthData.date_of_birth)), // Convert to ISO-8601 DateTime format
        first_cigarette_date: epochToIso(parseInt(userHealthData.first_cigarette_date)), // Convert to ISO-8601 DateTime format
        smoking_start_time: parseInt(userHealthData.smoking_start_time, 10), // Convert to integer
        is_nicotine_med: userHealthData.is_nicotine_med === 'true', // Convert to boolean
        is_depressed: userHealthData.is_depressed === 'true', // Convert to boolean
        is_spirit: userHealthData.is_spirit === 'true', // Convert to boolean
        last_7_days: userHealthData.last_7_days === 'true', // Convert to boolean
        is_e_cigarette: parseInt(userHealthData.is_e_cigarette, 10), // Convert to integer
        is_other_tobacco: parseInt(userHealthData.is_other_tobacco, 10), // Convert to integer
        cigarettes_per_day: parseInt(userHealthData.cigarettes_per_day, 10), // Convert to integer
        cigarettes_per_pack: parseInt(userHealthData.cigarettes_per_pack, 10), // Convert to integer
        pack_price: parseFloat(userHealthData.pack_price), // Convert to float
    }

    try {
        const existingRecord = await prismaClient.userHealth.findUnique({
            where: {
                user_id: user_id,
            },
        })

        if (existingRecord) {
            throw new Error('Duplicate')
        } else {
            const newUserHealth = await prismaClient.userHealth.create({
                data: {
                    ...processedData,
                    user_id: user_id,
                },
            })
        }
    } catch (error) {
        throw new Error(error)
    }

    const predictionsLen2 =
        Math.abs(predictions[0] - 1) < Math.abs(predictions[2] - 1) ||
        Math.abs(predictions[1] - 1) < Math.abs(predictions[2] - 1)
            ? [1, 0]
            : [0, 1]

    const optimalPlanIndex = predictionsLen2.reduce(
        (closestIndex, currentValue, currentIndex, array) => {
            return Math.abs(currentValue - 1) < Math.abs(array[closestIndex] - 1)
                ? currentIndex
                : closestIndex
        },
        0
    )

    for (let i = 0; i < predictionsLen2.length; i++) {
        const dayCount = i === 0 ? 30 : 90
        const cigarettesQuotaGeneration = await geneticAlgorithm(
            1000,
            100,
            parseInt(dayCount),
            parseInt(data.cigarettes_per_day),
            0
        )
        await prismaClient.userPlan.create({
            data: {
                user_id: user_id,
                duration: dayCount,
                probability: predictionsLen2[i],
                original_cigarettes_quota: cigarettesQuotaGeneration,
                is_active: optimalPlanIndex === i,
            },
        })
    }

    return predictionsLen2
}

const updateUserHealth = async (user_id, data) => {
    return await prismaClient.userHealth.update({
        where: {
            user_id: user_id,
        },
        data: data,
    })
}

const deleteUserHealth = async (user_id) => {
    try {
        await prismaClient.userPlan.deleteMany({
            where: {
                user_id: user_id,
            },
        })
    } catch (error) {
        throw new Error(error)
    }

    return await prismaClient.userHealth.delete({
        where: {
            user_id: user_id,
        },
    })
}

export default {
    fetchAllUserHealth,
    fetchUserHealthDetail,
    createUserHealth,
    updateUserHealth,
    deleteUserHealth,
}
