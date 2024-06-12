import Joi from 'joi';

const validateUserPlanUpdate = (req, res, next) => {
  const schema = Joi.object({
    plan_id: Joi.number().integer().positive().required().messages({
      'number.base': 'Plan ID should be a type of number',
      'number.integer': 'Plan ID should be an integer',
      'number.positive': 'Plan ID should be a positive number',
      'any.required': 'Plan ID is a required field'
    }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export { validateUserPlanUpdate };
