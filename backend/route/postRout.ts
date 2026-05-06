import { Router } from 'express'
import auth from '../middleware/auth'
import { createPost, getPost, deletePost, updatePost, getSinglePost } from '../collection/controllers'

const router = Router()

router.route('/posts').get(auth, getPost).post(auth, createPost)
router.route('/posts/:id').get(auth, getSinglePost).delete(auth, deletePost).patch(auth, updatePost)

export default router
