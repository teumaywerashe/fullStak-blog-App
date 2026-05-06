import { Router } from 'express'
import { signup, login, deleteUser } from '../collection/auth'

const router = Router()

router.route('/auth/signup').post(signup)
router.route('/auth/login').post(login)
router.route('/auth/delete').delete(deleteUser)

export default router
