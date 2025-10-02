const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const {
    createPost,
    getPost,
    deletePost,
    updatePost,
    getSinglePost
} = require('../collection/controllers')

router.route('/posts').get(auth, getPost).post(auth, createPost)
router.route('/posts/:id').get(auth, getSinglePost).delete(auth, deletePost).patch(auth, updatePost)


module.exports = router