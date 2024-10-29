// app.js
const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

// Cargar variables de entorno
dotenv.config()

// Conectar a MongoDB
connectDB()

// Inicializar Express
const app = express()
app.use(express.json())

module.exports = app
