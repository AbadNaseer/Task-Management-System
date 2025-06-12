const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    status: {
        type: String,
        enum: ['pending', 'in_progress', 'completed'],
        default: 'pending'
    },
    dueDate: {
        type: Date,
        required: [true, 'Due date is required']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

// Add index for better query performance
taskSchema.index({ user: 1, status: 1 });

module.exports = mongoose.model('Task', taskSchema);
