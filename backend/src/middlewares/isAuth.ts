// Checks for a JWT in the `Authorization` header of the request.
// If a JWT is present, verifies it using `jsonwebtoken` and attaches the decoded user ID to the request.
// If no JWT is present, or it is invalid, sends back an error response.

import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

// Extend the Express Request type to include a `userId` property.
declare global {
  namespace Express {
    interface Request {
      userId?: string
    }
  }
}

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    return res.status(500).json({ message: 'Internal server error' })
  }
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  try {
    const decoded = jwt.verify(token, secret)
    req.userId = (decoded as any).id
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}

export default isAuth
