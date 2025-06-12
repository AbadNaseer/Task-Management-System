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

// Get task statistics
router.get('/stats', async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        const stats = {
            total: tasks.length,
            completed: tasks.filter(task => task.status === 'completed').length,
            inProgress: tasks.filter(task => task.status === 'in_progress').length,
            pending: tasks.filter(task => task.status === 'pending').length
        };
        res.status(200).send(stats);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Update a task
router.put('/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'description', 'status', 'dueDate'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
        
        if (!task) {
            return res.status(404).send({ error: 'Task not found' });
        }

        updates.forEach(update => task[update] = req.body[update]);
        await task.save();
        res.send(task);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Delete a task
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        
        if (!task) {
            return res.status(404).send({ error: 'Task not found' });
        }

        res.send(task);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
