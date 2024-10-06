const Joi = require('joi');
const mongoose = require('mongoose');
const httpErrors = require('http-errors');

const validateBody = (schema) => {
  return (req, res, next) => {
    if (!schema || typeof schema.validate !== 'function') {
      return next(httpErrors(500, 'Invalid Joi schema')); // Додана перевірка на наявність Joi-схеми
    }

    const { error } = schema.validate(req.body);
    if (error) {
      return next(httpErrors(400, error.details[0].message));
    }
    next();
  };
};

// Middleware to check if the contact ID is a valid MongoDB ObjectId
const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return next(httpErrors(400, 'Invalid contact ID'));
  }
  next();
};

module.exports = { validateBody, isValidId };
