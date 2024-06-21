import Joi from 'joi'
import { errors } from '../utils/messageError.mjs'

const activityLogIdSchema = Joi.object({
    id: Joi.string()
        .required()
        .messages({
            'any.required': `${errors.ACTIVITY_LOG.ID.IS_REQUIRED}`,
            'string.empty': `${errors.ACTIVITY_LOG.ID.CANNOT_BE_EMPTY}`,
            'string.base': `${errors.ACTIVITY_LOG.ID.MUST_BE_VALID}`,
        }),
}).messages({
    'object.unknown': `${errors.HTTP.MESSAGE.UNKNOWN_BODY_ERROR}`,
})

const getActivityLogSchema = Joi.object({
    page: Joi.number()
        .integer()
        .min(1)
        .messages({
            'number.base': `${errors.HTTP.MESSAGE.UNKNOWN_BODY_ERROR}`,
            'number.integer': `${errors.HTTP.MESSAGE.UNKNOWN_BODY_ERROR}`,
            'number.min': `${errors.HTTP.MESSAGE.UNKNOWN_BODY_ERROR}`,
        }),
    size: Joi.number()
        .integer()
        .min(1)
        .messages({
            'number.base': `${errors.HTTP.MESSAGE.UNKNOWN_BODY_ERROR}`,
            'number.integer': `${errors.HTTP.MESSAGE.UNKNOWN_BODY_ERROR}`,
            'number.min': `${errors.HTTP.MESSAGE.UNKNOWN_BODY_ERROR}`,
        }),
})

export { activityLogIdSchema, getActivityLogSchema }
