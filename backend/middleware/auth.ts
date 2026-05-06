import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface AuthRequest extends Request {
  user?: { userId: string; name: string }
}

const auth = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ msg: 'Authentication invalid' })
      return
    }

    const token = authHeader.split(' ')[1]
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as { userID: string; name: string }

    req.user = { userId: payload.userID, name: payload.name }
    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({ msg: 'Authentication invalid or expired' })
  }
}

export default auth
