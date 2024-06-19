import Joi from 'joi'

const validateLeaderboardProvinceParams = (req, res, next) => {
    const schema = Joi.object({
        province_id: Joi.string().required().messages({
            'string.base': 'Province ID should be a type of string',
            'string.empty': 'Province ID cannot be an empty field',
            'any.required': 'Province ID is a required field',
        }),
    })

    const { error } = schema.validate(req.params)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    next()
}

const validateLeaderboardCityParams = (req, res, next) => {
    const schema = Joi.object({
        city_id: Joi.string().required().messages({
            'string.base': 'City ID should be a type of string',
            'string.empty': 'City ID cannot be an empty field',
            'any.required': 'City ID is a required field',
        }),
    })

    const { error } = schema.validate(req.params)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    next()
}

export { validateLeaderboardProvinceParams, validateLeaderboardCityParams }
