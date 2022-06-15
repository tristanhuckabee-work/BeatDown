const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const songRouter = require('./search.js');
const likeRouter = require('./like.js');
const commentRouter = require('./comments.js');

// ------------------------------------------------------------------------- //

router.use('/session', sessionRouter);
router.use('/users',   usersRouter);
router.use('/search',  songRouter);
router.use('/likes',   likeRouter);
router.use('/comments', commentRouter);

// ------------------------------------------------------------------------- //

module.exports = router;