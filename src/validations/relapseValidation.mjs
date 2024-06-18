import Joi from 'joi'
import { errors } from '../utils/messageError.mjs'

export const createRelapseSchema = Joi.object({
    reward: Joi.number().positive().required().messages({
        'any.required': errors.RELAPSE.REWARD.REQUIRED,
        'number.base': errors.RELAPSE.REWARD.BASE,
        'number.positive': errors.RELAPSE.REWARD.POSITIVE,
    }),
    user_id: Joi.string().required().messages({
        'any.required': errors.RELAPSE.USER_ID.REQUIRED,
        'string.empty': errors.RELAPSE.USER_ID.EMPTY,
        'string.base': errors.RELAPSE.USER_ID.BASE,
    }),
    date: Joi.number().integer().required().messages({
        'any.required': errors.RELAPSE.DATE.REQUIRED,
        'number.base': errors.RELAPSE.DATE.BASE,
        'number.integer': errors.RELAPSE.DATE.INTEGER,
    }),
    cigarettes_this_day: Joi.number().integer().required().messages({
        'any.required': errors.RELAPSE.CIGARETTES_THIS_DAY.REQUIRED,
        'number.base': errors.RELAPSE.CIGARETTES_THIS_DAY.BASE,
        'number.integer': errors.RELAPSE.CIGARETTES_THIS_DAY.INTEGER,
    }),
}).messages({
    'object.unknown': errors.HTTP.MESSAGE.UNKNOWN_BODY_ERROR,
})
