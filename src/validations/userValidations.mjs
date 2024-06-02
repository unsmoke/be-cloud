import Joi from 'joi'

const userSchema = Joi.object({
    fullName: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string()
        .min(8)
        .pattern(
            new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$')
        )
        .message(
            'Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special symbols'
        )
        .required(),
})

const loginSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().required(),
})

const validateRegister = (req, res, next) => {
    const { error } = userSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    next()
}

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
