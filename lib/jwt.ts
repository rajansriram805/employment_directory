import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_change_in_production'

export function generateToken(userId: string) {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: '30d'
  })
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as { id: string }
}

