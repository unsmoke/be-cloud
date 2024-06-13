import Joi from 'joi'
import { errors } from '../utils/messageError.mjs'

const createRelapseSchema = Joi.object({
    user_id: Joi.string().required(),
    date: Joi.number().integer().required(),
}).messages({
    'object.unknown': errors.HTTP.MESSAGE.UNKNOWN_BODY_ERROR,
})

export { createRelapseSchema }
