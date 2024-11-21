// models/User.js
const mongoose = require('mongoose')

const ProjectRoleSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  role: {
    type: String,
    enum: ['owner', 'collaborator', 'viewer'],
    default: 'collaborator',
  },
})

const ProjectRoles = mongoose.model('User', ProjectRoleSchema)

module.exports = ProjectRoles
