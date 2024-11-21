// app.js
const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

// models
const User = require('./models/users')

// routes
const userRoutes = require('./routes/userRoutes')
const exMemberRoutes = require('./routes/ExMemberRoutes')
const logRoutes = require('./routes/LogsRoutes')
const projectRolesRoutes = require('./routes/ProjectRoleRoutes')
const projectRoutes = require('./routes/ProjectRoutes')
const taskRoutes = require('./routes/TaskRoutes')

// Cargar variables de entorno
dotenv.config()

// Conectar a MongoDB
connectDB()

// Inicializar Express
const app = express()
app.use(express.json())
app.use(
  '/api',
  userRoutes,
  exMemberRoutes,
  logRoutes,
  projectRolesRoutes,
  projectRoutes,
  taskRoutes
)

module.exports = app
