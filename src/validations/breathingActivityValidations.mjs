import Joi from 'joi'
import { errors } from '../utils/messageError.mjs'

const createBreathingActivitySchema = Joi.object({
    duration: Joi.number().positive().required().messages({
        'any.required': errors.BREATHING_ACTIVITY.DURATION.REQUIRED,
        'number.base': errors.BREATHING_ACTIVITY.DURATION.BASE,
        'number.positive': errors.BREATHING_ACTIVITY.DURATION.POSITIVE,
    }),
    reward: Joi.number().positive().required().messages({
        'any.required': errors.BREATHING_ACTIVITY.REWARD.REQUIRED,
        'number.base': errors.BREATHING_ACTIVITY.REWARD.BASE,
        'number.positive': errors.BREATHING_ACTIVITY.REWARD.POSITIVE,
    }),
    user_id: Joi.string().required().messages({
        'any.required': errors.BREATHING_ACTIVITY.USER_ID.REQUIRED,
        'string.empty': errors.BREATHING_ACTIVITY.USER_ID.EMPTY,
        'string.base': errors.BREATHING_ACTIVITY.USER_ID.BASE,
    }),
    date: Joi.number().integer().required().messages({
        'any.required': errors.BREATHING_ACTIVITY.DATE.REQUIRED,
        'number.base': errors.BREATHING_ACTIVITY.DATE.BASE,
        'number.integer': errors.BREATHING_ACTIVITY.DATE.INTEGER,
    }),
}).messages({
    'object.unknown': errors.HTTP.MESSAGE.UNKNOWN_BODY_ERROR,
})

export { createBreathingActivitySchema }
