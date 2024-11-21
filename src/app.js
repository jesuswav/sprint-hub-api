// app.js
const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

// models
const User = require('./models/user')

// routes
const userRoutes = require('./routes/userRoutes')

// Cargar variables de entorno
dotenv.config()

// Conectar a MongoDB
connectDB()

// Inicializar Express
const app = express()
app.use(express.json())
app.use('/api', userRoutes)

module.exports = app
