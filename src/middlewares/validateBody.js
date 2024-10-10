
const validateBody = (req, res, next) => {

  const { name, email, phoneNumber } = req.body;
  console.log('Received body:', req.body); 

  if (!name || name.length < 3 || name.length > 20) {
    return res.status(400).json({
      status: 400,
      message: `"name" is required and should be between 3 and 20 characters`,
      data: null,
    });
  }

  if (!phoneNumber || phoneNumber.length < 3 || phoneNumber.length > 20) {
    return res.status(400).json({
      status: 400,
      message: `"phoneNumber" is required and should be between 3 and 20 characters`,
      data: null,
    });
  }

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



module.exports = validateBody;
