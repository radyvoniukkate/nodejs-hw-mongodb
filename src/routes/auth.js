const express = require('express');
const {
  registerUserController,
  loginUser,
  refreshAccessToken,
  logoutUser,
} = require('../controllers/auth');
const validateRegisterData = require('../middlewares/validateRegisterData');
const validateLoginData = require('../middlewares/validateLoginData');

const router = express.Router();

router.post('/register', validateRegisterData, registerUserController);
router.post('/login', validateLoginData, loginUser);
router.post('/refresh', refreshAccessToken);
router.post('/logout', logoutUser); 

module.exports = router;
