import Joi from 'joi';

const buyItemSchema = Joi.object({
    itemId: Joi.string().required().messages({
        'string.base': 'Item ID should be a type of string',
        'string.empty': 'Item ID cannot be an empty field',
        'any.required': 'Item ID is a required field'
    }),
});

const validateBuyItem = (req, res, next) => {
    const { error } = buyItemSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

export { validateBuyItem };
