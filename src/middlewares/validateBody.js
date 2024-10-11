
const validateBody = (req, res, next) => {

  const { email } = req.body;


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({
      status: 400,
      message: 'Invalid email format',
      data: null,
    });
  }

  next();
};

module.exports = validateBody;

