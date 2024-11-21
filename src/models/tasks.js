// models/tasks.js
const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending',
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Usuario responsable de la tarea
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  dueDate: { type: Date },
})

const Task = mongoose.model('tasks', TaskSchema)

module.exports = Task
