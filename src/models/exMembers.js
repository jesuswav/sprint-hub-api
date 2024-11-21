// models/exMembers.js
const mongoose = require('mongoose')

const ExMemberSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Usuario eliminado
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  }, // Proyecto del que fue eliminado
  role: { type: String }, // Rol que tenía antes de ser eliminado
  removedAt: { type: Date, default: Date.now }, // Fecha de eliminación
})

const ExMember = mongoose.model('User', ExMemberSchema)

module.exports = ExMember
