import { prismaClient } from '../app/db.mjs'
import dotenv from 'dotenv'

dotenv.config()

const fetchUserActivePlan = async (user_id) => {
    try {
        return await prismaClient.userPlan.findFirst({
            where: {
                user_id: user_id,
                is_active: true,
            },
        })
    } catch (error) {
        throw new Error('Error fetching user plans')
    }
}

const fetchAllUserPlan = async (user_id) => {
    try {
        return await prismaClient.userPlan.findMany({
            where: {
                user_id: user_id,
            },
        })
    } catch (error) {
        throw new Error('Error fetching user plans')
    }
}

const modifyUserPlanIsActive = async (data, user_id) => {
    const { plan_id } = data
    try {
        await prismaClient.userPlan.updateMany({
            where: {
                user_id: user_id,
                is_active: true,
            },
            data: {
                is_active: false,
            },
        })

        const updatedPlan = await prismaClient.userPlan.update({
            where: {
                plan_id: parseInt(plan_id),
            },
            data: {
                is_active: true,
            },
        })

        await prismaClient.user.update({
            where: {
                user_id: user_id,
            },
            data: {
                cigarettes_quota: updatedPlan.original_cigarettes_quota,
            },
        })

        return updatedPlan
    } catch (error) {
        throw new Error(error)
    }
}

export default {
    fetchUserActivePlan,
    fetchAllUserPlan,
    modifyUserPlanIsActive,
}
