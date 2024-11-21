// routes/userRoutes.js
const express = require('express')
const router = express.Router()

// model
const Project = require('../models/projects') // Asegúrate de importar tu modelo

// Ruta para obtener todos los usuarios
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find()
    res.json(projects) // Devuelve la lista de usuarios como JSON
  } catch (error) {
    console.error('Error al obtener usuarios:', error)
    res.status(500).json({ message: 'Error al obtener usuarios' })
  }
})

module.exports = router
