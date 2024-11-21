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

// Ruta para obtener un log por ID
router.get('/logs/:id', async (req, res) => {
  try {
    const { id } = req.params
    const log = await Log.findById(id).populate('user').populate('project')

    if (!log) {
      return res.status(404).json({ message: 'Log no encontrado.' })
    }

    res.json(log)
  } catch (error) {
    console.error('Error al obtener log:', error)
    res.status(500).json({ message: 'Error al obtener log.' })
  }
})

// Ruta para crear un nuevo log
router.post('/logs', async (req, res) => {
  try {
    const { action, user, project, role } = req.body

    if (!action || !user || !project) {
      return res
        .status(400)
        .json({ message: 'Acción, usuario y proyecto son obligatorios.' })
    }

    const newLog = new Log({ action, user, project, role })
    await newLog.save()

    res.status(201).json({ message: 'Log creado exitosamente.', log: newLog })
  } catch (error) {
    console.error('Error al crear log:', error)
    res.status(500).json({ message: 'Error al crear log.' })
  }
})

// Ruta para actualizar un log por ID (opcional, normalmente no se actualizan logs)
router.put('/logs/:id', async (req, res) => {
  try {
    const { id } = req.params
    const updateData = req.body

    const updatedLog = await Log.findByIdAndUpdate(id, updateData, {
      new: true,
    })
      .populate('user')
      .populate('project')

    if (!updatedLog) {
      return res.status(404).json({ message: 'Log no encontrado.' })
    }

    res.json({ message: 'Log actualizado exitosamente.', log: updatedLog })
  } catch (error) {
    console.error('Error al actualizar log:', error)
    res.status(500).json({ message: 'Error al actualizar log.' })
  }
})

// Ruta para eliminar un log por ID
router.delete('/logs/:id', async (req, res) => {
  try {
    const { id } = req.params

    const deletedLog = await Log.findByIdAndDelete(id)

    if (!deletedLog) {
      return res.status(404).json({ message: 'Log no encontrado.' })
    }

    res.json({ message: 'Log eliminado exitosamente.', log: deletedLog })
  } catch (error) {
    console.error('Error al eliminar log:', error)
    res.status(500).json({ message: 'Error al eliminar log.' })
  }
})

module.exports = router
