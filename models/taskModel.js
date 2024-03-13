const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    dueDate: Date,
    category: { type: String, required: true },
    priority: { type: String, required: true, enum: ['High', 'Medium', 'Low'] },
    completed: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});
module.exports = mongoose.model('Task', taskSchema);
