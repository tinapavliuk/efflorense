const express = require('express')
const { query } = require('../db')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const { type, sort, order, q } = req.query
    let sql =
      'SELECT id, name, type, price, length, color_name, image, meaning, perfect_for FROM flowers'
    const params = []
    const conditions = []

    if (type) {
      conditions.push('type = ?')
      params.push(type)
    }

    if (q) {
      conditions.push('name LIKE ?')
      params.push(`%${q}%`)
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ')
    }

    if (sort === 'price') {
      const dir = order && order.toLowerCase() === 'desc' ? 'DESC' : 'ASC'
      sql += ' ORDER BY price ' + dir
    } else {
      sql += ' ORDER BY id ASC'
    }

    const rows = await query(sql, params)

    const result = rows.map(f => ({
      id: f.id,
      name: f.name,
      type: f.type,
      price: Number(f.price),
      length: f.length,
      colorName: f.color_name,
      image: f.image,
      meaning: f.meaning,
      perfectFor: f.perfect_for
    }))

    res.json(result)
  } catch (error) {
    res.status(500).json({ message: 'Failed to load flowers' })
  }
})

module.exports = router
