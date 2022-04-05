const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');
const db = require('../../db/models');

// ------------------------------------------------------------------------- //

router.get( '/songs', asyncHandler( async (req, res) => {
  const songs = await db.Song.findAll({
    include: 'User'
  })

  return res.json(songs);
}))

const songVal = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a Title'),
  check('musicFile')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a URL'),
  check('waveFile')
    .exists({ checkFalsy: true })
    .withMessage('Please provide an Image')
];

router.post( '/songs/new', asyncHandler( async (req, res) => {
  console.log(req.body);
  const { title, musicFile, waveFile } = req.body;

  return res.json('You Made The Post');
}))

// ------------------------------------------------------------------------- //

module.exports = router;