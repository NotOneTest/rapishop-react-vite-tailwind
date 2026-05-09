// BACKEND API - RapiShop Express Server
// Este servidor maneja la lógica del backend para el e-commerce.
// Tecnologias: Express.js, bcrypt (encriptación), cors.
// Persistencia: Archivos JSON locales (users.json, orders.json, feedback.json).
// Puerto: 3001 local, process.env.PORT en producción (Render).

import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import { readFileSync, writeFileSync } from 'fs'

const app = express()
const PORT = process.env.PORT || 3001

// Archivos JSON como base de datos
const USERS_FILE = new URL('./users.json', import.meta.url)
const ORDERS_FILE = new URL('./orders.json', import.meta.url)
const FEEDBACK_FILE = new URL('./feedback.json', import.meta.url)

// MIDDLEWARES
// CORS - Permite peticiones del frontend (Netlify/Render)
app.use(cors({
  origin: ['https://rapishoptest.netlify.app', 'http://localhost:5173', 'http://localhost:4173', 'http://localhost:3001'],
  methods: ['GET', 'POST'],
  credentials: true
}))

// Convierte el body JSON en objeto JavaScript
app.use(express.json())

// FUNCIONES DE PERSISTENCIA
function readUsers() {
  try {
    return JSON.parse(readFileSync(USERS_FILE, 'utf-8'))
  } catch {
    return []
  }
}

function writeUsers(users) {
  writeFileSync(USERS_FILE, JSON.stringify(users, null, 2))
}

function readOrders() {
  try {
    return JSON.parse(readFileSync(ORDERS_FILE, 'utf-8'))
  } catch {
    return []
  }
}

function writeOrders(orders) {
  writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2))
}

function readFeedback() {
  try {
    return JSON.parse(readFileSync(FEEDBACK_FILE, 'utf-8'))
  } catch {
    return []
  }
}

function writeFeedback(feedback) {
  writeFileSync(FEEDBACK_FILE, JSON.stringify(feedback, null, 2))
}

// ENDPOINTS DE AUTENTICACION
// POST /api/register - Registrar nuevo usuario
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' })
  }

  const users = readUsers()

  if (users.find(u => u.email === email)) {
    return res.status(409).json({ error: 'El email ya está registrado' })
  }

  // Encriptar password con bcrypt (hash de 10 rondas)
  const passwordHash = await bcrypt.hash(password, 10)

  const newUser = {
    id: Date.now(),
    name,
    email,
    passwordHash,
    createdAt: new Date().toISOString()
  }

  users.push(newUser)
  writeUsers(users)

  // Eliminar passwordHash de la respuesta por seguridad
  const { passwordHash: _, ...userSafe } = newUser
  res.json({ success: true, user: userSafe })
})

// POST /api/login - Iniciar sesion
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son obligatorios' })
  }

  const users = readUsers()
  const found = users.find(u => u.email === email)

  if (!found) {
    return res.status(401).json({ error: 'Email o contraseña incorrectos' })
  }

  // Comparar password enviado con hash almacenado
  const valid = await bcrypt.compare(password, found.passwordHash)

  if (!valid) {
    return res.status(401).json({ error: 'Email o contraseña incorrectos' })
  }

  const { passwordHash, ...userSafe } = found
  res.json({ success: true, user: userSafe })
})

// POST /api/logout - Cerrar sesion
app.post('/api/logout', (req, res) => {
  res.json({ success: true })
})

// ENDPOINTS DE ORDENES
// POST /api/orders - Crear nueva orden
app.post('/api/orders', (req, res) => {
  const { userId, productos, total, estadoClave, claveDigital } = req.body

  if (!userId || !productos || !total) {
    return res.status(400).json({ error: 'Datos incompletos' })
  }

  const orders = readOrders()

  const newOrder = {
    id: Date.now(),
    userId,
    productos,
    total,
    fecha: new Date().toISOString(),
    estadoClave: estadoClave || 'pendiente',
    claveDigital: claveDigital || null
  }

  orders.push(newOrder)
  writeOrders(orders)

  res.json({ success: true, order: newOrder })
})

// GET /api/orders/:userId - Obtener ordenes de un usuario
// :userId es parametro dinamico de la URL
app.get('/api/orders/:userId', (req, res) => {
  const orders = readOrders()
  const userOrders = orders.filter(o => o.userId === Number(req.params.userId))
  res.json({ success: true, orders: userOrders })
})

// ENDPOINTS DE FEEDBACK
// POST /api/feedback - Crear opinion
app.post('/api/feedback', (req, res) => {
  const { user, rating, comentario } = req.body

  if (!rating || !comentario) {
    return res.status(400).json({ error: 'Datos incompletos' })
  }

  const feedback = readFeedback()

  const newFeedback = {
    id: Date.now(),
    user: user || 'Anónimo',
    rating,
    comentario,
    fecha: new Date().toISOString().split('T')[0]
  }

  // unshift() agrega al inicio del array
  feedback.unshift(newFeedback)
  writeFeedback(feedback)

  res.json({ success: true, feedback: newFeedback })
})

// GET /api/feedback - Obtener todas las opiniones
app.get('/api/feedback', (req, res) => {
  const feedback = readFeedback()
  res.json({ success: true, feedback })
})

// INICIAR SERVIDOR
app.listen(PORT, () => {
  console.log(`Rapishop API running on http://localhost:${PORT}`)
})
