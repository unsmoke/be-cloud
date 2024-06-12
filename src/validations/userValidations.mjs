import Joi from 'joi'

// Define the user schema with custom error messages
const userSchema = Joi.object({
    fullName: Joi.string().min(3).max(30).required().messages({
        'string.base': 'Full Name should be a type of string',
        'string.empty': 'Full Name cannot be an empty field',
        'string.min': 'Full Name should have a minimum length of 3',
        'string.max': 'Full Name should have a maximum length of 30',
        'any.required': 'Full Name is a required field',
    }),
    email: Joi.string().email().lowercase().required().messages({
        'string.base': 'Email should be a type of string',
        'string.email': 'Email should be a valid email address',
        'string.empty': 'Email cannot be an empty field',
        'any.required': 'Email is a required field',
    }),
    password: Joi.string()
        .min(8)
        .pattern(
            new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$')
        )
        .required()
        .messages({
            'string.base': 'Password should be a type of string',
            'string.min': 'Password should have a minimum length of 8',
            'string.pattern.base':
                'Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special symbols',
            'string.empty': 'Password cannot be an empty field',
            'any.required': 'Password is a required field',
        }),
})

// Define the login schema with custom error messages
const loginSchema = Joi.object({
    email: Joi.string().email().lowercase().required().messages({
        'string.base': 'Email should be a type of string',
        'string.email': 'Email should be a valid email address',
        'string.empty': 'Email cannot be an empty field',
        'any.required': 'Email is a required field',
    }),
    password: Joi.string().required().messages({
        'string.base': 'Password should be a type of string',
        'string.empty': 'Password cannot be an empty field',
        'any.required': 'Password is a required field',
    }),
})

// Middleware to validate registration request
const validateRegister = (req, res, next) => {
    const { error } = userSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    next()
}

// Middleware to validate login request
const validateLogin = (req, res, next) => {
    const { error } = loginSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    next()
}

export default {
    validateRegister,
    validateLogin,
}
