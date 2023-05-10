const express = require('express');
const router = express.Router();
const {
  loginUser,
  registerUser,
  signUpWithProvider,
  verifyEmailAddress,
  forgetPassword,
  changePassword,
  resetPassword,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  patchUserInfoById,
  getUserInfo,
} = require('../controller/userController');

// const {
//   passwordVerificationLimit,
//   emailVerificationLimit,
// } = require('../config/others');
const { isAuth } = require('../config/auth');

//verify email
// router.post('/verify-email', emailVerificationLimit, verifyEmailAddress);

//register a user
router.post('/register', registerUser);

//login a user
router.post('/login', loginUser);

//register or login with google and fb
router.post('/signup', signUpWithProvider);

//forget-password
// router.put('/forget-password', passwordVerificationLimit, forgetPassword);

//reset-password
// router.put('/reset-password', resetPassword);

//change password
// router.post('/change-password', changePassword);

//get all user
router.get('/', getAllUsers);

//get a user
router.get('/:id', getUserById);

//update a user
router.put('/:id', updateUser);

//delete a user
router.delete('/:id', isAuth, deleteUser);

//-------------------

//update a user info
router.patch('/:id', patchUserInfoById);

// get userinfo by token
router.get('/', isAuth, getUserInfo);

module.exports = router;
