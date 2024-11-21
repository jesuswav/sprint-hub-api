// routes/userRoutes.js
const express = require('express')
const router = express.Router()

// model
const Log = require('../models/logs') // Asegúrate de importar tu modelo

// Ruta para obtener todos los usuarios
router.get('/logs', async (req, res) => {
  try {
    const logs = await Log.find()
    res.json(logs) // Devuelve la lista de usuarios como JSON
  } catch (error) {
    console.error('Error al obtener usuarios:', error)
    res.status(500).json({ message: 'Error al obtener usuarios' })
  }
})

module.exports = router
