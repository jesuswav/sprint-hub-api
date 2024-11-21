// routes/userRoutes.js
const express = require('express')
const router = express.Router()

// model
const User = require('../models/users') // Asegúrate de importar tu modelo

// Ruta para obtener todos los usuarios
router.get('/users', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users) // Devuelve la lista de usuarios como JSON
  } catch (error) {
    console.error('Error al obtener usuarios:', error)
    res.status(500).json({ message: 'Error al obtener usuarios' })
  }
})

// Ruta para registrar un nuevo usuario
router.post('/users', async (req, res) => {
  try {
    const { username, email, password } = req.body

    // Validar que los campos requeridos estén presentes
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: 'Todos los campos son obligatorios.' })
    }

    // Validar que el email no exista ya
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'El email ya está registrado.' })
    }

    const newUser = new User({ username, email, password })
    await newUser.save()
    res
      .status(201)
      .json({ message: 'Usuario registrado exitosamente.', user: newUser })
  } catch (error) {
    console.error('Error al registrar usuario:', error)
    res.status(500).json({ message: 'Error al registrar usuario.' })
  }
})

// Ruta para obtener un usuario por email
router.get('/users/:email', async (req, res) => {
  try {
    const { email } = req.params

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' })
    }

    res.status(200).json(user)
  } catch (error) {
    console.error('Error al obtener usuario:', error)
    res.status(500).json({ message: 'Error al obtener usuario.' })
  }
})

// Ruta para actualizar un usuario por email
router.put('/users/:email', async (req, res) => {
  try {
    const { email } = req.params
    const updateData = req.body // Datos a actualizar recibidos del body

    // Validar que el email exista en la base de datos
    const user = await User.findOne({ email })
    if (!user) {
      return res
        .status(404)
        .json({ message: 'Usuario no encontrado para actualizar.' })
    }

    // Actualizar solo los campos que tengan sentido (evita el _id)
    const updatedUser = await User.findOneAndUpdate(
      { email },
      updateData, // Actualiza los datos enviados en el body
      { new: true, runValidators: true } // Devuelve el usuario actualizado y aplica validaciones
    )

    res
      .status(200)
      .json({ message: 'Usuario actualizado exitosamente.', user: updatedUser })
  } catch (error) {
    console.error('Error al actualizar usuario:', error)
    res.status(500).json({ message: 'Error al actualizar usuario.' })
  }
})

// Ruta para eliminar un usuario por email
router.delete('/users/:email', async (req, res) => {
  try {
    const { email } = req.params

    const deletedUser = await User.findOneAndDelete({ email })
    if (!deletedUser) {
      return res
        .status(404)
        .json({ message: 'Usuario no encontrado para eliminar.' })
    }

    res
      .status(200)
      .json({ message: 'Usuario eliminado exitosamente.', user: deletedUser })
  } catch (error) {
    console.error('Error al eliminar usuario:', error)
    res.status(500).json({ message: 'Error al eliminar usuario.' })
  }
})

module.exports = router
