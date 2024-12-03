// routes/taskRoutes.js
const express = require('express')
const router = express.Router()

// model
const Task = require('../models/tasks') // Asegúrate de importar tu modelo

// Ruta para obtener todos los usuarios
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find()
    res.json(tasks) // Devuelve la lista de usuarios como JSON
  } catch (error) {
    console.error('Error al obtener usuarios:', error)
    res.status(500).json({ message: 'Error al obtener usuarios' })
  }
})

// Ruta para registrar una nueva tarea
router.post('/tasks', async (req, res) => {
  try {
    const { name, description, status, project, assignedTo, dueDate } = req.body

    // Validar que los campos requeridos estén presentes
    if (!name || !project) {
      return res
        .status(400)
        .json({ message: 'El nombre y el proyecto son obligatorios.' })
    }

    const newTask = new Task({
      name,
      description,
      status,
      project,
      assignedTo,
      dueDate,
    })
    await newTask.save()
    res
      .status(201)
      .json({ message: 'Tarea creada exitosamente.', task: newTask })
  } catch (error) {
    console.error('Error al crear tarea:', error)
    res.status(500).json({ message: 'Error al crear tarea.' })
  }
})

// Ruta para obtener una tarea por ID
router.get('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params

    const task = await Task.findById(id).populate('project assignedTo') // Incluye detalles del proyecto y del usuario asignado
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada.' })
    }

    res.status(200).json(task)
  } catch (error) {
    console.error('Error al obtener tarea:', error)
    res.status(500).json({ message: 'Error al obtener tarea.' })
  }
})

// Ruta para actualizar una tarea por ID
router.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params
    const updateData = req.body // Datos a actualizar recibidos del body

    // Validar que la tarea exista
    const task = await Task.findById(id)
    if (!task) {
      return res
        .status(404)
        .json({ message: 'Tarea no encontrada para actualizar.' })
    }

    // Actualizar la tarea con los datos proporcionados
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      updateData, // Actualiza los datos enviados en el body
      { new: true, runValidators: true } // Devuelve la tarea actualizada y aplica validaciones
    )

    res
      .status(200)
      .json({ message: 'Tarea actualizada exitosamente.', task: updatedTask })
  } catch (error) {
    console.error('Error al actualizar tarea:', error)
    res.status(500).json({ message: 'Error al actualizar tarea.' })
  }
})

// Ruta para eliminar una tarea por ID
router.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params

    const deletedTask = await Task.findByIdAndDelete(id)
    if (!deletedTask) {
      return res
        .status(404)
        .json({ message: 'Tarea no encontrada para eliminar.' })
    }

    res
      .status(200)
      .json({ message: 'Tarea eliminada exitosamente.', task: deletedTask })
  } catch (error) {
    console.error('Error al eliminar tarea:', error)
    res.status(500).json({ message: 'Error al eliminar tarea.' })
  }
})

// Actualizar una tarea existente
router.put('/complete-task/:id', async (req, res) => {
  const { id } = req.params // ID de la tarea desde los parámetros de la URL
  const { name, description, status, assignedTo, dueDate } = req.body // Datos para actualizar

  // Lista de valores aceptados para el campo status
  const validStatuses = ['pending', 'in-progress', 'completed']

  try {
    // Verificar que la tarea existe
    const task = await Task.findById(id)
    if (!task) {
      return res.status(404).json({ error: 'La tarea no existe.' })
    }

    // Actualizar los campos permitidos
    if (name) task.name = name
    if (description) task.description = description
    if (status) {
      // Validar que el status sea válido
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          error: `El valor de status no es válido. Debe ser uno de: ${validStatuses.join(
            ', '
          )}.`,
        })
      }
      task.status = status
    }
    if (assignedTo) task.assignedTo = assignedTo
    if (dueDate) task.dueDate = dueDate

    // Guardar la tarea actualizada
    const updatedTask = await task.save()

    res
      .status(200)
      .json({ message: 'Tarea actualizada correctamente.', task: updatedTask })
  } catch (error) {
    console.error('Error al actualizar la tarea:', error)
    res.status(500).json({ error: 'Ocurrió un error al actualizar la tarea.' })
  }
})

module.exports = router
