const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const User = require('../models/user');
const createHttpError = require('http-errors');
const Session = require('../models/session');

const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw createHttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  return newUser;
};

const refreshTokenService = async (refreshToken) => {
  if (!refreshToken) {
    throw createHttpError(401, 'Refresh token missing');
  }

  let userId;
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    userId = decoded.userId;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw createHttpError(403, 'Refresh token expired');
    }
    throw createHttpError(403, 'Invalid refresh token');
  }

  const user = await User.findById(userId);
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const accessToken = jwt.sign(
    { userId: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );
  const newRefreshToken = jwt.sign(
    { userId: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '30d' }
  );

  return { accessToken, refreshToken: newRefreshToken };
};

const logoutUserService = async (refreshToken) => {
  let decodedToken;
  try {
    decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw createHttpError(403, 'Refresh token expired');
    }
    throw createHttpError(403, 'Invalid refresh token');
  }

    const session = await Session.findOneAndDelete({ refreshToken });
    await Session.findOneAndDelete({ accessToken: decodedToken.accessToken });
    
  if (!session) {
    throw createHttpError(404, 'Session not found');
    }
    

  console.log(`Session for user ${decodedToken.userId} successfully deleted`);
  return;
};


module.exports = {
  registerUser,
    refreshTokenService,
  logoutUserService
};
