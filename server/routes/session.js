const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findByEmail, toPublicUser, DUMMY_HASH } = require('../data/users');

const router = express.Router();
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/', (req, res) => {

  const { email, password } = req.body || {};

  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    password.length === 0 ||
    !EMAIL_PATTERN.test(email.trim())
  ) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }


  const user = findByEmail(email.trim().toLowerCase());

 
  const passwordOk = bcrypt.compareSync(password, user ? user.passwordHash : DUMMY_HASH);


  if (!user || !passwordOk) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }


  const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return res.status(200).json({ token, user: toPublicUser(user) });
});

module.exports = router;
