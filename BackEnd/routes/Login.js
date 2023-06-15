const express = require('express');
const router = express.Router();
const Userlog = require('../models/UserDetails');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Userlog.findOne({ username, password });

    if (user) {
      res.status(200).json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password' });

    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred during login' });
  }
});

module.exports = router;
