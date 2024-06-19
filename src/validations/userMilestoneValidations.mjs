import Joi from 'joi'
import { errors } from '../utils/messageError.mjs'

const fetchIdMilestoneSchema = Joi.object({
    user_id: Joi.string().required().messages({
        'any.required': errors.USER_MILESTONE.USER_ID.REQUIRED,
        'string.empty': errors.USER_MILESTONE.USER_ID.EMPTY,
        'string.base': errors.USER_MILESTONE.USER_ID.BASE,
    }),
}).messages({
    'object.unknown': errors.HTTP.MESSAGE.UNKNOWN_BODY_ERROR,
})

export { fetchIdMilestoneSchema }
