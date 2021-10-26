const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const userWithEmail = await User.findOne({ where: { email } }).catch(
    (err) => {
      console.log('Error: ', err);
    }
  );

  if (!userWithEmail) {
    return res.status(400).json({ msg: 'User with this email does not exist' });
  }

  if (userWithEmail.password !== password) {
    return res.status(400).json({ error: 'Incorrect password' });
  }

  const jwtToken = jwt.sign(
    { id: userWithEmail.id, email: userWithEmail.email },
    'secret',
    { expiresIn: '1h' }
  );

  res.json({ message: 'welcome back!', token: jwtToken });
});

module.exports = router;
