const { registerUser, refreshTokenService,logoutUserService } = require('../services/auth');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');
const Session = require('../models/session');

const registerUserController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await registerUser({ name, email, password });

    res.status(201).json({
      status: 'success',
      message: 'Successfully registered a user!',
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return next(createHttpError(401, 'Invalid email or password'));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(createHttpError(401, 'Invalid email or password'));
    }

    await Session.deleteOne({ userId: user._id });

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '30d' }
    );

    const session = new Session({
      userId: user._id,
      accessToken,
      refreshToken,
      accessTokenValidUntil: new Date(Date.now() + 15 * 60 * 1000),
      refreshTokenValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), 
    });
    await session.save();

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict', 
      maxAge: 30 * 24 * 60 * 60 * 1000, 
    });

    return res.status(200).json({
      status: 'success',
      message: 'Successfully logged in a user!',
      data: { accessToken },
    });
  } catch (error) {
    next(error);
  }
};

const refreshAccessToken = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken; 

  if (!refreshToken) {
    return next(createHttpError(401, 'Refresh token missing'));
  }

  try {
    const { accessToken } = await refreshTokenService(refreshToken);
    res.status(200).json({
      status: 'success',
      message: 'Successfully refreshed a session!',
      data: { accessToken },
    });
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return next(createHttpError(400, 'No refresh token provided'));
    }

    await logoutUserService(refreshToken);

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUserController, loginUser, refreshAccessToken, logoutUser };
