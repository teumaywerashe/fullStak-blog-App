const { signup, login, deleteUser } = require('../collection/auth')
const express = require('express')
const router = express.Router()
router.route('/auth/signup').post(signup)
router.route('/auth/login').post(login)
router.route('/auth/delete').delete(deleteUser)


module.exports = router