import Joi from 'joi';

const buyItemSchema = Joi.object({
  itemId: Joi.string().required(),
});

const validateBuyItem = (req, res, next) => {
  const { error } = buyItemSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export { validateBuyItem };
