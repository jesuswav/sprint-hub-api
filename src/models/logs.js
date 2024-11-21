// models/User.js
const mongoose = require('mongoose')

const LogSchema = new mongoose.Schema({
  action: { type: String, required: true }, // Ejemplo: "Added Role"
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Usuario afectado
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  }, // Proyecto relacionado
  role: { type: String }, // Rol asignado (opcional si aplica)
  timestamp: { type: Date, default: Date.now }, // Hora de la acción
})

const Log = mongoose.model('User', LogSchema)

module.exports = Log
