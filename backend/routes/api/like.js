const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');
const { requireAuth } = require('../../utils/auth');
const db = require('../../db/models');

// ------------------------------------------------------------------------- //

// CREATE LIKE
router.post( '/add', asyncHandler( async (req, res) => {
  console.log('INSIDE CREATE API: ', req.body)
  const like = db.Like.build(req.body);
  await like.save();

  return res.json(like);
}));
// READ LIKE
router.get( '/', asyncHandler( async (req, res) => {
  const likes = await db.Like.findAll();
  return res.json(likes);
}));
// DELETE LIKE
router.delete( '/del', asyncHandler( async (req, res) => {
  const {userId, songId} = req.body
  const like = await db.Like.findOne({
    where: { userId, songId }
  });
  
  if (!like) return res.json('Like does not exist');
  like.destroy();
  return res.json(like);
}));

// ------------------------------------------------------------------------- //

module.exports = router;