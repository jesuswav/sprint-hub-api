// routes/userRoutes.js
const express = require('express')
const router = express.Router()

// model
const ProjectRole = require('../models/projectRoles') // Asegúrate de importar tu modelo

// Ruta para obtener todos los usuarios
router.get('/project-roles', async (req, res) => {
  try {
    const projectRoles = await ProjectRole.find()
    res.json(projectRoles) // Devuelve la lista de usuarios como JSON
  } catch (error) {
    console.error('Error al obtener usuarios:', error)
    res.status(500).json({ message: 'Error al obtener usuarios' })
  }
})

// Ruta para obtener un rol por ID
router.get('/project-roles/:id', async (req, res) => {
  try {
    const { id } = req.params
    const projectRole = await ProjectRole.findById(id)
      .populate('project')
      .populate('user')

    if (!projectRole) {
      return res.status(404).json({ message: 'Rol de proyecto no encontrado.' })
    }

    res.json(projectRole)
  } catch (error) {
    console.error('Error al obtener rol de proyecto:', error)
    res.status(500).json({ message: 'Error al obtener rol de proyecto.' })
  }
})

// Ruta para crear un nuevo rol de proyecto
router.post('/project-roles', async (req, res) => {
  try {
    const { project, user, role } = req.body

    if (!project || !user || !role) {
      return res
        .status(400)
        .json({ message: 'El proyecto, usuario y rol son obligatorios.' })
    }

    const newProjectRole = new ProjectRole({ project, user, role })
    await newProjectRole.save()

    res
      .status(201)
      .json({
        message: 'Rol de proyecto creado exitosamente.',
        projectRole: newProjectRole,
      })
  } catch (error) {
    console.error('Error al crear rol de proyecto:', error)
    res.status(500).json({ message: 'Error al crear rol de proyecto.' })
  }
})

// Ruta para actualizar un rol de proyecto por ID
router.put('/project-roles/:id', async (req, res) => {
  try {
    const { id } = req.params
    const updateData = req.body

    const updatedProjectRole = await ProjectRole.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    )
      .populate('project')
      .populate('user')

    if (!updatedProjectRole) {
      return res.status(404).json({ message: 'Rol de proyecto no encontrado.' })
    }

    res.json({
      message: 'Rol de proyecto actualizado exitosamente.',
      projectRole: updatedProjectRole,
    })
  } catch (error) {
    console.error('Error al actualizar rol de proyecto:', error)
    res.status(500).json({ message: 'Error al actualizar rol de proyecto.' })
  }
})

// Ruta para eliminar un rol de proyecto por ID
router.delete('/project-roles/:id', async (req, res) => {
  try {
    const { id } = req.params

    const deletedProjectRole = await ProjectRole.findByIdAndDelete(id)

    if (!deletedProjectRole) {
      return res.status(404).json({ message: 'Rol de proyecto no encontrado.' })
    }

    res.json({
      message: 'Rol de proyecto eliminado exitosamente.',
      projectRole: deletedProjectRole,
    })
  } catch (error) {
    console.error('Error al eliminar rol de proyecto:', error)
    res.status(500).json({ message: 'Error al eliminar rol de proyecto.' })
  }
})

module.exports = router
