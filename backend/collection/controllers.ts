import { Response } from 'express'
import Post from '../module/post'
import { AuthRequest } from '../middleware/auth'

export const createPost = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const post = await Post.create(req.body)
    res.status(201).json(post)
  } catch (error) {
    res.status(404).json({ error })
  }
}

export const getSinglePost = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const post = await Post.findById(req.params.id)
    res.status(200).json(post)
  } catch (error) {
    res.status(404).json({ error })
  }
}

export const getPost = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const posts = await Post.find({}).sort({ updatedAt: -1 })
    res.status(200).json(posts)
  } catch (error) {
    res.status(404).json({ error })
  }
}

export const deletePost = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id)
    res.status(200).json(post)
  } catch (error) {
    res.status(404).json(error)
  }
}

export const updatePost = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json(post)
  } catch (error) {
    res.status(404).json(error)
  }
}
