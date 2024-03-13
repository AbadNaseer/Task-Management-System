const express = require('express');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Register new user
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username, password });
        await user.save();
        res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// User login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !(await user.isValidPassword(password))) {
            return res.status(401).send({ message: 'Invalid username or password' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
        res.status(200).send({ token });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = router;
