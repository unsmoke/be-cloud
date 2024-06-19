import Joi from 'joi'

const userHealthSchema = Joi.object({
    date_of_birth: Joi.date().required().messages({
        'string.base': 'Date of Birth should be a valid date',
        'any.required': 'Date of Birth is a required field',
    }),
    gender: Joi.string().required().messages({
        'string.base': 'Gender should be a type of string',
        'string.empty': 'Gender cannot be an empty field',
        'any.required': 'Gender is a required field',
    }),
    smoking_start_time: Joi.number().integer().required().messages({
        'number.base': 'Smoking Start Time should be an integer',
        'any.required': 'Smoking Start Time is a required field',
    }),
    is_nicotine_med: Joi.boolean().required().messages({
        'boolean.base': 'Is Nicotine Med should be a boolean',
        'any.required': 'Is Nicotine Med is a required field',
    }),
    is_e_cigarette: Joi.number().required().messages({
        'number.base': 'Is E-Cigarette should be a number',
        'any.required': 'Is E-Cigarette is a required field',
    }),
    first_cigarette_date: Joi.date().required().messages({
        'string.base': 'First Cigarette Date should be a valid date',
        'any.required': 'First Cigarette Date is a required field',
    }),
    is_depressed: Joi.boolean().required().messages({
        'boolean.base': 'Is Depressed should be a boolean',
        'any.required': 'Is Depressed is a required field',
    }),
    is_other_tobacco: Joi.number().required().messages({
        'number.base': 'Is Other Tobacco should be a number',
        'any.required': 'Is Other Tobacco is a required field',
    }),
    is_spirit: Joi.boolean().required().messages({
        'boolean.base': 'Is Spirit should be a boolean',
        'any.required': 'Is Spirit is a required field',
    }),
    cigarettes_per_day: Joi.number().integer().required().messages({
        'number.base': 'Cigarettes Per Day should be an integer',
        'any.required': 'Cigarettes Per Day is a required field',
    }),
    cigarettes_per_pack: Joi.number().integer().required().messages({
        'number.base': 'Cigarettes Per Pack should be an integer',
        'any.required': 'Cigarettes Per Pack is a required field',
    }),
    pack_price: Joi.number().precision(2).required().messages({
        'number.base': 'Pack Price should be a number',
        'any.required': 'Pack Price is a required field',
    }),
    province: Joi.string().required().messages({
        'string.base': 'Province should be a string',
        'any.required': 'Province is a required field',
    }),
    city: Joi.string().required().messages({
        'string.base': 'City should be a string',
        'any.required': 'City is a required field',
    }),
    last_7_days: Joi.boolean().required().messages({
        'boolean.base': 'Last 7 days should be a boolean',
        'any.required': 'Last 7 days is a required field',
    }),
    motivation: Joi.string().max(1000).required().messages({
        'string.base': 'Motivation should be a string',
        'string.max': 'Motivation should not exceed 1000 characters',
        'any.required': 'Motivation is a required field',
    }),
})

const validateUserHealth = (req, res, next) => {
    const { error } = userHealthSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    next()
}

const validateUserHealthParams = (req, res, next) => {
    const schema = Joi.object({
        user_id: Joi.string().guid({ version: 'uuidv4' }).required().messages({
            'string.base': 'User ID should be a type of string',
            'string.guid': 'User ID should be a valid UUID',
            'string.empty': 'User ID cannot be an empty field',
            'any.required': 'User ID is a required field',
        }),
    })

    const { error } = schema.validate(req.params)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    next()
}

export { validateUserHealth, validateUserHealthParams }
