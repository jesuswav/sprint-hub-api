// routes/userRoutes.js
const express = require('express')
const router = express.Router()

// model
const ProjectRole = require('../models/projectRoles') // Asegúrate de importar tu modelo

// Ruta para obtener todos los usuarios
router.get('/project-roles', async (req, res) => {
  console.log('Hola')
  try {
    const projectRoles = await ProjectRole.find()
    res.json(projectRoles) // Devuelve la lista de usuarios como JSON
  } catch (error) {
    console.error('Error al obtener usuarios:', error)
    res.status(500).json({ message: 'Error al obtener usuarios' })
  }
})

module.exports = router
