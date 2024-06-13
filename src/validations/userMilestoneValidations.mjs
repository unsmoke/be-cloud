import Joi from 'joi'
import { errors } from '../utils/messageError.mjs'

const createUserMilestoneSchema = Joi.object({
    title: Joi.string().required().messages({
        'any.required': errors.USER_MILESTONE.TITLE.REQUIRED,
        'string.empty': errors.USER_MILESTONE.TITLE.EMPTY,
        'string.base': errors.USER_MILESTONE.TITLE.BASE,
    }),
    description: Joi.string().required().messages({
        'any.required': errors.USER_MILESTONE.DESCRIPTION.REQUIRED,
        'string.empty': errors.USER_MILESTONE.DESCRIPTION.EMPTY,
        'string.base': errors.USER_MILESTONE.DESCRIPTION.BASE,
    }),
    target_value: Joi.number().positive().required().messages({
        'any.required': errors.USER_MILESTONE.TARGET_VALUE.REQUIRED,
        'number.base': errors.USER_MILESTONE.TARGET_VALUE.BASE,
        'number.positive': errors.USER_MILESTONE.TARGET_VALUE.POSITIVE,
    }),
    achieved_value: Joi.number().positive().required().messages({
        'any.required': errors.USER_MILESTONE.ACHIEVED_VALUE.REQUIRED,
        'number.base': errors.USER_MILESTONE.ACHIEVED_VALUE.BASE,
        'number.positive': errors.USER_MILESTONE.ACHIEVED_VALUE.POSITIVE,
    }),
    date_achieved: Joi.number().integer().required().messages({
        'any.required': errors.USER_MILESTONE.DATE_ACHIEVED.REQUIRED,
        'number.base': errors.USER_MILESTONE.DATE_ACHIEVED.BASE,
        'number.integer': errors.USER_MILESTONE.DATE_ACHIEVED.INTEGER,
    }),
    user_id: Joi.string().required().messages({
        'any.required': errors.USER_MILESTONE.USER_ID.REQUIRED,
        'string.empty': errors.USER_MILESTONE.USER_ID.EMPTY,
        'string.base': errors.USER_MILESTONE.USER_ID.BASE,
    }),
}).messages({
    'object.unknown': errors.HTTP.MESSAGE.UNKNOWN_BODY_ERROR,
})

export { createUserMilestoneSchema }
