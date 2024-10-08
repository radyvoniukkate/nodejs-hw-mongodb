const Joi = require('joi');
const createHttpError = require('http-errors');

const registerValidationSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const validateRegisterData = (req, res, next) => {
  const { error } = registerValidationSchema.validate(req.body, {
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

module.exports = validateRegisterData;
