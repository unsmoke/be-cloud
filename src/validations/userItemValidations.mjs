import Joi from 'joi'

const userItemSchema = Joi.object({
    user_id: Joi.string().guid({ version: 'uuidv4' }).required().messages({
        'string.base': 'User ID should be a type of string',
        'string.guid': 'User ID should be a valid UUID',
        'string.empty': 'User ID cannot be an empty field',
        'any.required': 'User ID is a required field',
    }),
    item_id: Joi.string().guid({ version: 'uuidv4' }).required().messages({
        'string.base': 'Item ID should be a type of string',
        'string.guid': 'Item ID should be a valid UUID',
        'string.empty': 'Item ID cannot be an empty field',
        'any.required': 'Item ID is a required field',
    }),
})

const validateUserItem = (req, res, next) => {
    const { error } = userItemSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    next()
}

const validateUserItemParams = (req, res, next) => {
    const schema = Joi.object({
        user_id: Joi.string().guid({ version: 'uuidv4' }).required().messages({
            'string.base': 'User ID should be a type of string',
            'string.guid': 'User ID should be a valid UUID',
            'string.empty': 'User ID cannot be an empty field',
            'any.required': 'User ID is a required field',
        }),
        item_id: Joi.string().guid({ version: 'uuidv4' }).required().messages({
            'string.base': 'Item ID should be a type of string',
            'string.guid': 'Item ID should be a valid UUID',
            'string.empty': 'Item ID cannot be an empty field',
            'any.required': 'Item ID is a required field',
        }),
    })

    const { error } = schema.validate(req.params)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    next()
}

export { validateUserItem, validateUserItemParams }
