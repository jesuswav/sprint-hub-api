// models/User.js
const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  owners: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ], // Múltiples dueños
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Usuarios adicionales que pueden colaborar
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }], // Referencias a las tareas del proyecto
  status: {
    type: String,
    enum: ['Pendiente', 'En progreso', 'Terminado'], // Estados permitidos
    default: 'Pendiente', // Estado inicial
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const Project = mongoose.model('User', ProjectSchema)

module.exports = Project
