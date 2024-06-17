import { PrismaClient } from '@prisma/client'
import { ResponseError } from '../utils/responseError.mjs'
import { errors } from '../utils/messageError.mjs'
import { createUserMilestoneSchema } from '../validations/userMilestoneValidations.mjs'

const prisma = new PrismaClient()

const fetchMilestoneDetail = async (id) => {
    const userMilestone = await prisma.userMilestone.findUnique({
        where: { milestone_id: parseInt(id) },
    })
    if (!userMilestone) {
        throw new ResponseError(
            errors.HTTP.CODE.NOT_FOUND,
            errors.HTTP.STATUS.NOT_FOUND,
            'User milestone not found'
        )
    }
    return userMilestone
}

const createMilestone = async (req) => {
    // Validate the input
    const { error, value } = createUserMilestoneSchema.validate(req.body)

    if (error) {
        throw new ResponseError(
            errors.HTTP.CODE.BAD_REQUEST,
            errors.HTTP.STATUS.BAD_REQUEST,
            error.details[0].message
        )
    }

    const { title, description, target_value, achieved_value, date_achieved, user_id } = value

    // Create the user milestone
    const userMilestone = await prisma.userMilestone.create({
        data: {
            title,
            description,
            target_value,
            achieved_value,
            date_achieved: new Date(date_achieved * 1000), // Convert epoch to Date
            user_id,
        },
    })

    return userMilestone
}

export default {
    fetchMilestoneDetail,
    createMilestone,
}
