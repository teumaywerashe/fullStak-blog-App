import { Request, Response } from 'express'
import User from '../module/user'

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.create(req.body)
    const token = user.createJWT()
    res.status(201).json({ name: user.name, token })
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(400).json({ msg: 'User already exists' })
      return
    }
    res.status(401).json({ msg: error })
  }
}

export const deleteUser = async (_req: Request, res: Response): Promise<void> => {
  try {
    await User.deleteMany()
    res.send('deleted')
  } catch (error) {
    console.log(error)
  }
}

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(401).json({ msg: 'Invalid email or password' })
    return
  }

  const user = await User.findOne({ email })
  if (!user) {
    res.status(401).json({ msg: 'Invalid email or password' })
    return
  }

  const isCorrectPassword = await user.comparePassword(password)
  if (!isCorrectPassword) {
    res.status(401).json({ msg: 'Invalid email or password' })
    return
  }

  const token = user.createJWT()
  res.status(200).json({ name: user.name, token })
}
