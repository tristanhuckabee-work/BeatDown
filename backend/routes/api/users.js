const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { db, User } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation.js');
// const { db } = require('../../config');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// ------------------------------------------------------------------------------------ //

router.post( '/', validateSignup, asyncHandler( async (req, res) => {
  const { email, password, username } = req.body;
  const user = await User.signup({ email, username, password });

  await setTokenCookie(res, user);

  return res.json({ user });
}));
router.patch('/:id/edit', requireAuth, asyncHandler( async (req, res) => {
  console.log(`\n\nINSIDE ROUTE\n\n`);
  // let users = db.User.findAll();
  console.log(db)
  await req.body.save()
  console.log(req.body);

  return res.json(req.body);
}));

// ------------------------------------------------------------------------------------ //

module.exports = router;