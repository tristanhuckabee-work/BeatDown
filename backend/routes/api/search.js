const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');
const { requireAuth } = require('../../utils/auth');
const db = require('../../db/models');

// ------------------------------------------------------------------------- //

// CREATE SONG
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
}));

// READ SONGS
router.get( '/songs', asyncHandler( async (req, res) => {
  const songs = await db.Song.findAll({
    include: 'User'
  })

  return res.json(songs);
}))

// UPDATE SONG
router.patch( '/songs/:id/edit', requireAuth, songVal, asyncHandler( async (req, res) => {
  const { id, title, musicFile, waveFile } = req.body;
  const song = await db.Song.findByPk(id);
  const errors = validationResult(req);

  if ( errors.isEmpty() ) {
    song.title = title;
    song.musicFile = musicFile;
    song.waveFile = waveFile;
    song.updatedAt = new Date();
    await song.save()

    return res.json('Post Successful');
  } else {
    const err = errors.array().map( err => err.msg );
    return res.json(err);
  }
}));

// DELETE SONG
router.delete( '/songs/:id/delete', requireAuth, asyncHandler( async (req, res) => {
  const { incoming } = req.body;
  const song = await db.Song.findByPk(incoming);

  song.destroy();
  
  const check = await db.Song.findByPk(incoming);

  return res.json('Delete Successful');
}));

// ------------------------------------------------------------------------- //

module.exports = router;