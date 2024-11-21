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

// Ruta para obtener un proyecto por ID
router.get('/projects/:id', async (req, res) => {
  try {
    const { id } = req.params
    const project = await Project.findById(id)
      .populate('owners')
      .populate('members')
      .populate('tasks')

    if (!project) {
      return res.status(404).json({ message: 'Proyecto no encontrado.' })
    }

    res.json(project)
  } catch (error) {
    console.error('Error al obtener proyecto:', error)
    res.status(500).json({ message: 'Error al obtener proyecto' })
  }
})

// Ruta para crear un nuevo proyecto
router.post('/projects', async (req, res) => {
  try {
    const { name, description, owners, members, tasks, status } = req.body

    if (!name || !owners || owners.length === 0) {
      return res
        .status(400)
        .json({ message: 'El nombre y al menos un dueño son obligatorios.' })
    }

    const newProject = new Project({
      name,
      description,
      owners,
      members,
      tasks,
      status,
    })
    await newProject.save()

    res
      .status(201)
      .json({ message: 'Proyecto creado exitosamente.', project: newProject })
  } catch (error) {
    console.error('Error al crear proyecto:', error)
    res.status(500).json({ message: 'Error al crear proyecto.' })
  }
})

// Ruta para actualizar un proyecto por ID
router.put('/projects/:id', async (req, res) => {
  try {
    const { id } = req.params
    const updateData = req.body

    // Actualizar el proyecto
    const updatedProject = await Project.findByIdAndUpdate(id, updateData, {
      new: true,
    })
      .populate('owners')
      .populate('members')
      .populate('tasks')

    if (!updatedProject) {
      return res.status(404).json({ message: 'Proyecto no encontrado.' })
    }

    res.json({
      message: 'Proyecto actualizado exitosamente.',
      project: updatedProject,
    })
  } catch (error) {
    console.error('Error al actualizar proyecto:', error)
    res.status(500).json({ message: 'Error al actualizar proyecto.' })
  }
})

// Ruta para eliminar un proyecto por ID
router.delete('/projects/:id', async (req, res) => {
  try {
    const { id } = req.params

    const deletedProject = await Project.findByIdAndDelete(id)

    if (!deletedProject) {
      return res.status(404).json({ message: 'Proyecto no encontrado.' })
    }

    res.json({
      message: 'Proyecto eliminado exitosamente.',
      project: deletedProject,
    })
  } catch (error) {
    console.error('Error al eliminar proyecto:', error)
    res.status(500).json({ message: 'Error al eliminar proyecto.' })
  }
})

module.exports = router
