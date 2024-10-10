const express = require('express');
const {
  registerUserController,
  loginUser,
  refreshAccessToken,
  logoutUser,
  sendResetEmail,
  resetPassword,
} = require('../controllers/auth');
const validateRegisterData = require('../middlewares/validateRegisterData');
const validateLoginData = require('../middlewares/validateLoginData');
const validateBody = require('../middlewares/validateBody');
const validateReset = require('../middlewares/validateReset');

const router = express.Router();

router.post('/register', validateRegisterData, registerUserController);
router.post('/login', validateLoginData, loginUser);
router.post('/refresh', refreshAccessToken);
router.post('/logout', logoutUser); 
router.post('/send-reset-email', validateBody, sendResetEmail);
router.post('/reset-pwd', validateReset, resetPassword);

module.exports = router;
