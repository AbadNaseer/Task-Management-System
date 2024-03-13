const express = require('express');
const Task = require('../models/taskModel');
const router = express.Router();

// Create a new task
router.post('/', async (req, res) => {
    try {
        const task = new Task({ ...req.body, user: req.user._id });
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Get all tasks for the logged-in user
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
