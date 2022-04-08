const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');
const { requireAuth } = require('../../utils/auth');
const db = require('../../db/models');

// ------------------------------------------------------------------------- //

// CREATE LIKE
router.post( '/add', asyncHandler( async (req, res) => {
  const like = db.Like.build(req.body);
  await like.save();
  return res.json(like);
}));
// READ LIKE
router.get( '/', asyncHandler( async (req, res) => {
  console.log('YOU HIT HERE!!!')
  const likes = await db.Like.findAll();
  console.log('ROUTE LIKES: ', likes)
  return res.json(likes);
}));
// DELETE LIKE
router.delete( '/del', asyncHandler( async (req, res) => {
  const like = await db.Like.findByPk(req.body);
  like.destroy();
  return res.json(req.body);
}));

// ------------------------------------------------------------------------- //

module.exports = router;