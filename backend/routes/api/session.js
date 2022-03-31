const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

// ------------------------------------------------------------------------------------ //

router.post( '/', asyncHandler( async (req, res, next) => {
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
}))

router.delete( '/', (_req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'SUCCESS' });
});

module.exports = router;