const Post = require('../module/post')
    // const { trace } = require('../route/postRout')
const createPost = async(req, res) => {
    try {
        const post = await Post.create(req.body)
        res.status(201).json(post)
    } catch (error) {
        res.status(404).json({ error })
    }

}
const getSinglePost = async(req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({ error })
    }
    console.log(req.params.id);
}
const getPost = async(req, res) => {
    try {
        const posts = await Post.find({}).sort({ updatedAt: -1 })
        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json({ error })
    }

}
const deletePost = async(req, res) => {
    try {
        const postID = req.params.id
        const post = await Post.findByIdAndDelete(postID)
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json(error)
    }

}
const updatePost = async(req, res) => {
    try {
        const postID = req.params.id
        const post = await Post.findByIdAndUpdate(postID, req.body)
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json(error)
    }
}
module.exports = {
    createPost,
    getPost,
    deletePost,
    updatePost,
    getSinglePost
}