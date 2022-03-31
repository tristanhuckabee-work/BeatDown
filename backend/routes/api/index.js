const router = require('express').Router();

//TEST EXISTENCE
router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;