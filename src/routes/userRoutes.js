// routes/userRoutes.js
const express = require('express')
const router = express.Router()

// model
const User = require('../models/users') // Asegúrate de importar tu modelo

// Ruta para obtener todos los usuarios
router.get('/users', async (req, res) => {
  console.log('Hola')
  try {
    const users = await User.find()
    res.json(users) // Devuelve la lista de usuarios como JSON
  } catch (error) {
    console.error('Error al obtener usuarios:', error)
    res.status(500).json({ message: 'Error al obtener usuarios' })
  }
})

module.exports = router
