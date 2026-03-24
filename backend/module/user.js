const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide name'],
        unique: true,

    },
    email: {
        type: String,
        required: [true, 'please provide email'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'please provide a valid email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'please provide password'],
        minLength: 3,

    }
}, )


userSchema.pre('save', async function() {

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)

})
userSchema.methods.createJWT = function() {
    return jwt.sign({ userID: this.id, name: this.name }, process.env.JWT_SECRET, { expiresIn: process.env.LIFE_TIME })
}
userSchema.methods.comparePassword = async function(cridentialPassword) {
    const matchs = await bcrypt.compare(cridentialPassword, this.password)
    return matchs
}


module.exports = mongoose.model('User', userSchema)