import Joi from 'joi';

// Define the schema with custom messages for each field
const itemSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.base': 'Name should be a type of string',
        'string.empty': 'Name cannot be an empty field',
        'any.required': 'Name is a required field'
    }),
    description: Joi.string().required().messages({
        'string.base': 'Description should be a type of string',
        'string.empty': 'Description cannot be an empty field',
        'any.required': 'Description is a required field'
    }),
    price: Joi.number().required().messages({
        'number.base': 'Price should be a type of number',
        'any.required': 'Price is a required field'
    }),
    img_url: Joi.string().uri().required().messages({
        'string.base': 'Image URL should be a type of string',
        'string.uri': 'Image URL should be a valid URI',
        'string.empty': 'Image URL cannot be an empty field',
        'any.required': 'Image URL is a required field'
    })
});

const validateItem = (req, res, next) => {
    const { error } = itemSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

export { validateItem };
