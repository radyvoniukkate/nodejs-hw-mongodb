const jwt = require('jsonwebtoken');
const createHttpError = require('http-errors');
const User = require('../models/user'); 
const Session = require('../models/session');

const authenticate = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token =
    authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : null;

  if (!token) {
    return next(createHttpError(401, 'Access token missing'));
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

       const session = await Session.findOne({ userId: decoded.userId });
       if (!session) {
         return next(
           createHttpError(401, 'Session not found or user is logged out')
         );
       }
      
    const user = await User.findById(decoded.userId);
    if (!user) {
      return next(createHttpError(404, 'User not found'));
    }

    req.user = user;

    const now = Math.floor(Date.now() / 1000); 
    if (decoded.exp < now) {
      return next(createHttpError(401, 'Access token expired'));
    }

    next();
  } catch (error) {
    return next(createHttpError(403, 'Invalid access token'));
  }
};

module.exports = authenticate;
