const express = require('express')
const { query } = require('../db')
const { authMiddleware } = require('../middleware/authMiddleware')

const router = express.Router()

router.use(authMiddleware)

router.get('/', async (req, res) => {
  try {
    const userId = req.user.id

    const rows = await query(
      'SELECT id, user_id, kind, flower_id, name, image, price, quantity FROM cart_items WHERE user_id = ? ORDER BY id ASC',
      [userId]
    )

    const result = rows.map(row => ({
      id: row.id,
      userId: row.user_id,
      kind: row.kind,
      flowerId: row.flower_id,
      name: row.name,
      image: row.image,
      price: Number(row.price),
      quantity: row.quantity
    }))

    res.json(result)
  } catch (error) {
    res.status(500).json({ message: 'Failed to load cart' })
  }
})

router.post('/', async (req, res) => {
  try {
    const userId = req.user.id
    const { kind, flowerId, name, image, price, quantity } = req.body

    if (!kind || !name || price == null) {
      return res.status(400).json({ message: 'Kind, name and price are required' })
    }

    if (price <= 0) {
      return res.status(400).json({ message: 'Price must be positive' })
    }

    if (kind === 'flower') {
      const qty = quantity && quantity > 0 ? quantity : 1

      if (!flowerId) {
        return res.status(400).json({ message: 'flowerId is required for flower item' })
      }

      const existing = await query(
        'SELECT id, quantity FROM cart_items WHERE user_id = ? AND kind = ? AND flower_id = ? LIMIT 1',
        [userId, 'flower', flowerId]
      )

      if (existing.length > 0) {
        const item = existing[0]
        const newQuantity = item.quantity + qty

        await query(
          'UPDATE cart_items SET name = ?, image = ?, price = ?, quantity = ? WHERE id = ?',
          [name, image || null, price, newQuantity, item.id]
        )

        const updatedRows = await query(
          'SELECT id, user_id, kind, flower_id, name, image, price, quantity FROM cart_items WHERE id = ?',
          [item.id]
        )

        const row = updatedRows[0]

        return res.json({
          id: row.id,
          userId: row.user_id,
          kind: row.kind,
          flowerId: row.flower_id,
          name: row.name,
          image: row.image,
          price: Number(row.price),
          quantity: row.quantity
        })
      } else {
        const result = await query(
          'INSERT INTO cart_items (user_id, kind, flower_id, name, image, price, quantity) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [userId, 'flower', flowerId, name, image || null, price, qty]
        )

        const insertedId = result.insertId

        const rows = await query(
          'SELECT id, user_id, kind, flower_id, name, image, price, quantity FROM cart_items WHERE id = ?',
          [insertedId]
        )

        const row = rows[0]

        return res.status(201).json({
          id: row.id,
          userId: row.user_id,
          kind: row.kind,
          flowerId: row.flower_id,
          name: row.name,
          image: row.image,
          price: Number(row.price),
          quantity: row.quantity
        })
      }
    }

    if (kind === 'packaging') {
      const existing = await query(
        'SELECT id FROM cart_items WHERE user_id = ? AND kind = ? LIMIT 1',
        [userId, 'packaging']
      )

      const qty = 1

      if (existing.length > 0) {
        const id = existing[0].id

        await query(
          'UPDATE cart_items SET name = ?, image = ?, price = ?, quantity = ? WHERE id = ?',
          [name, image || null, price, qty, id]
        )

        const rows = await query(
          'SELECT id, user_id, kind, flower_id, name, image, price, quantity FROM cart_items WHERE id = ?',
          [id]
        )

        const row = rows[0]

        return res.json({
          id: row.id,
          userId: row.user_id,
          kind: row.kind,
          flowerId: row.flower_id,
          name: row.name,
          image: row.image,
          price: Number(row.price),
          quantity: row.quantity
        })
      } else {
        const result = await query(
          'INSERT INTO cart_items (user_id, kind, flower_id, name, image, price, quantity) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [userId, 'packaging', null, name, image || null, price, qty]
        )

        const insertedId = result.insertId

        const rows = await query(
          'SELECT id, user_id, kind, flower_id, name, image, price, quantity FROM cart_items WHERE id = ?',
          [insertedId]
        )

        const row = rows[0]

        return res.status(201).json({
          id: row.id,
          userId: row.user_id,
          kind: row.kind,
          flowerId: row.flower_id,
          name: row.name,
          image: row.image,
          price: Number(row.price),
          quantity: row.quantity
        })
      }
    }

    res.status(400).json({ message: 'Invalid kind' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to add item to cart' })
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const userId = req.user.id
    const itemId = Number(req.params.id)
    const { quantity, name, image, price } = req.body

    const rows = await query(
      'SELECT id, user_id, kind, flower_id, name, image, price, quantity FROM cart_items WHERE id = ? AND user_id = ?',
      [itemId, userId]
    )

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Cart item not found' })
    }

    const current = rows[0]

    if (quantity === 0) {
      await query('DELETE FROM cart_items WHERE id = ? AND user_id = ?', [itemId, userId])
      return res.json({ message: 'Item removed (quantity 0)' })
    }

    const newQuantity = quantity && quantity > 0 ? quantity : current.quantity
    const newName = name != null ? name : current.name
    const newImage = image != null ? image : current.image
    const newPrice = price != null ? price : current.price

    if (newPrice <= 0 || newQuantity <= 0) {
      return res.status(400).json({ message: 'Price and quantity must be positive' })
    }

    await query(
      'UPDATE cart_items SET name = ?, image = ?, price = ?, quantity = ? WHERE id = ? AND user_id = ?',
      [newName, newImage, newPrice, newQuantity, itemId, userId]
    )

    const updatedRows = await query(
      'SELECT id, user_id, kind, flower_id, name, image, price, quantity FROM cart_items WHERE id = ? AND user_id = ?',
      [itemId, userId]
    )

    const row = updatedRows[0]

    res.json({
      id: row.id,
      userId: row.user_id,
      kind: row.kind,
      flowerId: row.flower_id,
      name: row.name,
      image: row.image,
      price: Number(row.price),
      quantity: row.quantity
    })
  } catch (error) {
    res.status(500).json({ message: 'Failed to update cart item' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const userId = req.user.id
    const itemId = Number(req.params.id)

    await query('DELETE FROM cart_items WHERE id = ? AND user_id = ?', [itemId, userId])

    res.status(204).end()
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete cart item' })
  }
})

module.exports = router
