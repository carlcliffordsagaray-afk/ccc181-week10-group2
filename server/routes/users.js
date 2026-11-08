const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const { toPublicUser } = require('../data/users');

const router = express.Router();

router.get('/me', requireAuth, (req, res) => {
  res.status(200).json(toPublicUser(req.user));
});

module.exports = router;
