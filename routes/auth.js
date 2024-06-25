const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
// require('dotenv').config();

const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
  const { username, email, password, isAdmin } = req.body;

  try {
    console.log("req.body")
    console.log(req.body)
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    user = new User({ username, email, password, isAdmin });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    res.status(200).json({ message: 'Sign in Successfull' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login User
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    let response = {
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin
    }

    res.status(200).send(response);

  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
