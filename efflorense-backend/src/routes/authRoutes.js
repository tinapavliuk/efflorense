const express = require('express')
const bcrypt = require('bcrypt')
const { query } = require('../db')
const { createToken } = require('../utils/createToken')
const { authMiddleware } = require('../middleware/authMiddleware')


const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const { email, password, name, phone } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password too short' })
    }

    const existing = await query('SELECT id FROM users WHERE email = ?', [email])
    if (existing.length > 0) {
      return res.status(409).json({ message: 'Email already in use' })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const result = await query(
      'INSERT INTO users (email, password_hash, name, phone) VALUES (?, ?, ?, ?)',
      [email, passwordHash, name || null, phone || null]
    )

    const userId = result.insertId

    const user = {
      id: userId,
      email,
      name: name || null,
      phone: phone || null
    }

    const accessToken = createToken({ id: userId, email })

    res.status(201).json({
      accessToken,
      user
    })
  } catch (error) {
    res.status(500).json({ message: 'Registration failed' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const rows = await query(
      'SELECT id, email, password_hash, name, phone FROM users WHERE email = ?',
      [email]
    )

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const userRow = rows[0]

    const valid = await bcrypt.compare(password, userRow.password_hash)
    if (!valid) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const user = {
      id: userRow.id,
      email: userRow.email,
      name: userRow.name,
      phone: userRow.phone
    }

    const accessToken = createToken({ id: userRow.id, email: userRow.email })

    res.json({
      accessToken,
      user
    })
  } catch (error) {
    res.status(500).json({ message: 'Login failed' })
  }
})

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id

    const rows = await query(
      'SELECT id, email, name, phone FROM users WHERE id = ?',
      [userId]
    )

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json(rows[0])
  } catch (error) {
    res.status(500).json({ message: 'Failed to load profile' })
  }
})

module.exports = router
