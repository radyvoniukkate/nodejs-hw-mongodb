const { body, validationResult } = require('express-validator');

const validateLoginData = [
  body('email').isEmail().withMessage('Please enter a valid email').notEmpty(),
  body('password').notEmpty().withMessage('Password is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 'error', message: errors.array() });
    }
    next();
  },
];

module.exports = validateLoginData;
