const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');
const { requireAuth } = require('../../utils/auth');
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
    .notEmpty()
    .withMessage('Please provide a Title'),
  check('musicFile')
    .exists({ checkFalsy: true })
    .notEmpty()
    .isURL()
    .withMessage('Please provide a URL'),
  check('waveFile')
    .exists({ checkFalsy: true })
    .notEmpty()
    .isURL()
    .withMessage('Please provide an Image')
];

router.post( '/songs/new', requireAuth, songVal, asyncHandler( async (req, res) => {
  const { artistId, title, musicFile, waveFile, createdAt, updatedAt } = req.body;
  const song = db.Song.build({ artistId, title, musicFile, waveFile, createdAt, updatedAt });
  const errors = validationResult(req);

  if ( errors.isEmpty() ) {
    await song.save();
    return res.json('Post Successful');
  } else {
    const err = errors.array().map( err => err.msg );
    return res.json(err);
  }
  return res.json('You Made The Post');
}))

// ------------------------------------------------------------------------- //

module.exports = router;