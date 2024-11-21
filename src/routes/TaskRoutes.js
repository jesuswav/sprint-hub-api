// routes/taskRoutes.js
const express = require('express')
const router = express.Router()

// model
const Task = require('../models/tasks') // Asegúrate de importar tu modelo

// Ruta para obtener todos los usuarios
router.get('/tasks', async (req, res) => {
  console.log('Hola')
  try {
    const tasks = await Task.find()
    res.json(tasks) // Devuelve la lista de usuarios como JSON
  } catch (error) {
    console.error('Error al obtener usuarios:', error)
    res.status(500).json({ message: 'Error al obtener usuarios' })
  }
})

module.exports = router
