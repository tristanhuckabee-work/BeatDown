const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { setTokenCookie, restoreUser } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation.js');

const router = express.Router();

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid eMail or username'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password'),
  handleValidationErrors
];

// ------------------------------------------------------------------------------------ //

// RESTORE SESSION USER
router.get( '/', restoreUser, (req, res) => {
  const { user } = req;
  if (user) {
    return res.json({
      user: user.toSafeObject()
    });
  } else {
    return res.json({});
  }
});

// LOGIN
router.post( '/', validateLogin, asyncHandler( async (req, res, next) => {
  const { credential, password } = req.body;
  const user = await User.login({ credential, password });

  if (!user) {
    const err = new Error('Login Failed');
    err.status = 401;
    err.title = 'Login Failed';
    err.errors = ['The provided credentials are invalid.'];
    
    return next(err);
  }

  await setTokenCookie(res, user);

  return res.json({ user });
}));

// LOGOUT
router.delete( '/', (_req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'SUCCESS' });
});

// ------------------------------------------------------------------------------------ //

module.exports = router;