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


// Define the API endpoint for receiving user data
router.post('/userdetails', async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = new Userlog({ name, email });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports = router;
