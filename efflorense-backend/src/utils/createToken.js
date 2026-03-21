const jwt = require('jsonwebtoken')

function createToken(user) {
  const payload = {
    id: user.id,
    email: user.email
  }

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '7d'
  })

  return token
}

module.exports = { createToken }
