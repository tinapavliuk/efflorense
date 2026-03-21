const express = require('express')
const { query } = require('../db')
const { authMiddleware } = require('../middleware/authMiddleware')

const router = express.Router()

router.use(authMiddleware)

router.post('/', async (req, res) => {
  try {
    const userId = req.user.id

    const items = await query(
      'SELECT id, user_id, kind, flower_id, name, image, price, quantity FROM cart_items WHERE user_id = ?',
      [userId]
    )

    if (items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' })
    }

    const hasFlower = items.some(i => i.kind === 'flower')
    const hasPackaging = items.some(i => i.kind === 'packaging')

    if (!hasFlower || !hasPackaging) {
      return res
        .status(400)
        .json({ message: 'Order must contain at least one flower and one packaging' })
    }

    let total = 0
    items.forEach(i => {
      total += Number(i.price) * i.quantity
    })

    const orderResult = await query(
      'INSERT INTO orders (user_id, total_price) VALUES (?, ?)',
      [userId, total]
    )

    const orderId = orderResult.insertId

    for (const item of items) {
      await query(
        'INSERT INTO order_items (order_id, kind, flower_id, name, image, price, quantity) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
          orderId,
          item.kind,
          item.flower_id,
          item.name,
          item.image || null,
          item.price,
          item.quantity
        ]
      )
    }

    await query('DELETE FROM cart_items WHERE user_id = ?', [userId])

    const responseItems = items.map(i => ({
      kind: i.kind,
      flowerId: i.flower_id,
      name: i.name,
      image: i.image,
      price: Number(i.price),
      quantity: i.quantity
    }))

    res.status(201).json({
      id: orderId,
      userId,
      total,
      items: responseItems
    })
  } catch (error) {
    res.status(500).json({ message: 'Failed to place order' })
  }
})

module.exports = router
