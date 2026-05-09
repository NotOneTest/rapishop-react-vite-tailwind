import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import { readFileSync, writeFileSync } from 'fs'

const app = express()
const PORT = 3001
const USERS_FILE = new URL('./users.json', import.meta.url)

app.use(cors({
  origin: ['https://rapishoptest.netlify.app', 'http://localhost:5173'],
  methods: ['GET', 'POST'],
  credentials: true
}))
app.use(express.json())

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

app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' })
  }
  const users = readUsers()
  if (users.find(u => u.email === email)) {
    return res.status(409).json({ error: 'El email ya está registrado' })
  }
  const passwordHash = await bcrypt.hash(password, 10)
  const newUser = { id: Date.now(), name, email, passwordHash, createdAt: new Date().toISOString() }
  users.push(newUser)
  writeUsers(users)
  const { passwordHash: _, ...userSafe } = newUser
  res.json({ success: true, user: userSafe })
})

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
  const valid = await bcrypt.compare(password, found.passwordHash)
  if (!valid) {
    return res.status(401).json({ error: 'Email o contraseña incorrectos' })
  }
  const { passwordHash, ...userSafe } = found
  res.json({ success: true, user: userSafe })
})

app.listen(PORT, () => {
  console.log(`Rapishop API running on http://localhost:${PORT}`)
})
