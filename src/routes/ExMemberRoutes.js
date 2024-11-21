// routes/userRoutes.js
const express = require('express')
const router = express.Router()

// model
const ExMember = require('../models/exMembers') // Asegúrate de importar tu modelo

// Ruta para obtener todos los usuarios
router.get('/ex-members', async (req, res) => {
  try {
    const exMembers = await ExMember.find()
    res.json(exMembers) // Devuelve la lista de usuarios como JSON
  } catch (error) {
    console.error('Error al obtener usuarios:', error)
    res.status(500).json({ message: 'Error al obtener usuarios' })
  }
})

// Ruta para obtener un ex-miembro por ID
router.get('/ex-members/:id', async (req, res) => {
  try {
    const { id } = req.params
    const exMember = await ExMember.findById(id)
      .populate('user')
      .populate('project')

    if (!exMember) {
      return res.status(404).json({ message: 'Ex-miembro no encontrado.' })
    }

    res.json(exMember)
  } catch (error) {
    console.error('Error al obtener ex-miembro:', error)
    res.status(500).json({ message: 'Error al obtener ex-miembro.' })
  }
})

// Ruta para registrar un nuevo ex-miembro
router.post('/ex-members', async (req, res) => {
  try {
    const { user, project, role } = req.body

    if (!user || !project) {
      return res
        .status(400)
        .json({ message: 'Usuario y proyecto son obligatorios.' })
    }

    const newExMember = new ExMember({ user, project, role })
    await newExMember.save()

    res
      .status(201)
      .json({
        message: 'Ex-miembro registrado exitosamente.',
        exMember: newExMember,
      })
  } catch (error) {
    console.error('Error al registrar ex-miembro:', error)
    res.status(500).json({ message: 'Error al registrar ex-miembro.' })
  }
})

// Ruta para eliminar un ex-miembro por ID
router.delete('/ex-members/:id', async (req, res) => {
  try {
    const { id } = req.params

    const deletedExMember = await ExMember.findByIdAndDelete(id)

    if (!deletedExMember) {
      return res.status(404).json({ message: 'Ex-miembro no encontrado.' })
    }

    res.json({
      message: 'Ex-miembro eliminado exitosamente.',
      exMember: deletedExMember,
    })
  } catch (error) {
    console.error('Error al eliminar ex-miembro:', error)
    res.status(500).json({ message: 'Error al eliminar ex-miembro.' })
  }
})

module.exports = router
