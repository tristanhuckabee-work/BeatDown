const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');
const { requireAuth } = require('../../utils/auth');
const db = require('../../db/models');

router.post( '/new', asyncHandler( async (req, res) => {
  const comment = db.Comment.build(req.body);
  await comment.save();
  return res.json(comment);
}))
router.get( '/', asyncHandler( async (req, res) => {
  const comments = await db.Comment.findAll({
    include: 'User'
  });
  return res.json(comments);
}))
router.delete( '/del', asyncHandler( async (req, res) => {
  const comment = await db.Comment.findByPk(req.body.id);

  comment.destroy();

  return res.json(comment);
}))

module.exports = router;