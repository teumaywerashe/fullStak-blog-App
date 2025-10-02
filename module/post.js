const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
    postHeader: {
        type: String,
    },
    postText: {
        type: String,
    },
    username: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }
}, { timestamps: true })


module.exports = mongoose.model('Post', postSchema)