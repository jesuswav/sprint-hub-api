// routes/userRoutes.js
const express = require('express')
const router = express.Router()

// model
const ExMember = require('../models/exMembers') // Asegúrate de importar tu modelo

// Ruta para obtener todos los usuarios
router.get('/ex-members', async (req, res) => {
  console.log('Hola')
  try {
    const exMembers = await ExMember.find()
    res.json(exMembers) // Devuelve la lista de usuarios como JSON
  } catch (error) {
    console.error('Error al obtener usuarios:', error)
    res.status(500).json({ message: 'Error al obtener usuarios' })
  }
})

module.exports = router
