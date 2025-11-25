require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()
const { query } = require('./db')
const flowersRoutes = require('./routes/flowersRoutes')
const authRoutes = require('./routes/authRoutes')
const cartRoutes = require('./routes/cartRoutes')   
const ordersRoutes = require('./routes/ordersRoutes')




app.use(express.json())
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173'
  })
)
app.use('/auth', authRoutes)
app.use('/flowers', flowersRoutes)
app.use('/cart', cartRoutes)
app.use('/orders', ordersRoutes)



app.get('/', async (req, res) => {
  try {
    const rows = await query('SELECT 1 AS ok')
    res.json({
      status: 'ok',
      message: 'Efflorense API',
      dbOk: rows[0]?.ok === 1
    })
  } catch (error) {
    console.error('DB TEST ERROR', error)

    res.status(500).json({
      
      status: 'error',
      message: 'Database connection failed'
    })
  }
})


const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})
