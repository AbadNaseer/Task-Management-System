const express = require('express');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');

const router = express.Router();

// Register new user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        
        if (existingUser) {
            return res.status(400).send({ error: 'Email already exists' });
        }
        
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// User login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user || !(await user.isValidPassword(password))) {
            return res.status(401).send({ error: 'Invalid email or password' });
        }
        
        const token = jwt.sign(
            { userId: user._id, name: user.name, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        res.status(200).send({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Get user profile
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        res.send(user);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const user = await User.findById(req.user._id);
        
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        updates.forEach(update => user[update] = req.body[update]);
        await user.save();
        
        res.send({
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = router;
