import Joi from 'joi'
import { errors } from '../utils/messageError.mjs'

const createJournalActivitySchema = Joi.object({
    title: Joi.string().required().messages({
        'any.required': errors.JOURNAL_ACTIVITY.TITLE.REQUIRED,
        'string.empty': errors.JOURNAL_ACTIVITY.TITLE.EMPTY,
        'string.base': errors.JOURNAL_ACTIVITY.TITLE.BASE,
    }),
    body: Joi.string().required().messages({
        'any.required': errors.JOURNAL_ACTIVITY.BODY.REQUIRED,
        'string.empty': errors.JOURNAL_ACTIVITY.BODY.EMPTY,
        'string.base': errors.JOURNAL_ACTIVITY.BODY.BASE,
    }),
    reward: Joi.number().positive().required().messages({
        'any.required': errors.JOURNAL_ACTIVITY.REWARD.REQUIRED,
        'number.base': errors.JOURNAL_ACTIVITY.REWARD.BASE,
        'number.positive': errors.JOURNAL_ACTIVITY.REWARD.POSITIVE,
    }),
    user_id: Joi.string().required().messages({
        'any.required': errors.JOURNAL_ACTIVITY.USER_ID.REQUIRED,
        'string.empty': errors.JOURNAL_ACTIVITY.USER_ID.EMPTY,
        'string.base': errors.JOURNAL_ACTIVITY.USER_ID.BASE,
    }),
    date: Joi.number().integer().required().messages({
        'any.required': errors.JOURNAL_ACTIVITY.DATE.REQUIRED,
        'number.base': errors.JOURNAL_ACTIVITY.DATE.BASE,
        'number.integer': errors.JOURNAL_ACTIVITY.DATE.INTEGER,
    }),
}).messages({
    'object.unknown': errors.HTTP.MESSAGE.UNKNOWN_BODY_ERROR,
})

export { createJournalActivitySchema }
