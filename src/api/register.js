const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { fullName, email, password } = req.body;

  const alreadyExists = await User.findOne({ where: { email } }).catch((err) =>
    console.log(err)
  );

  if (alreadyExists) {
    return res.status(400).json({ msg: 'User already exists' });
  }

  const newUser = new User({
    fullName,
    email,
    password,
  });
  const savedUser = await newUser.save().catch((err) => {
    console.log(err);
    res.json({ error: 'cannot register user at the moment' });
  });

  if (savedUser)
    res.json({
      msg: 'User created successfully',
    });
});

module.exports = router;
