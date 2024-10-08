const Joi = require('joi');
const createHttpError = require('http-errors');

const loginValidationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please enter a valid email',
    'string.empty': 'Email is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 6 characters long',
  }),
});

const validateLoginData = (req, res, next) => {
  const { error } = loginValidationSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(', ');
    return next(createHttpError(400, errorMessage));
  }

  next();
};

module.exports = validateLoginData;
