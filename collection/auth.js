const User = require('../module/user')
const signup = async(req, res) => {
    try {
        const user = await User.create(req.body)
        const token = await user.createJWT()
        res.status(201).json({ name: user.name, token })
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ msg: 'User already exists' })
        }
        return res.status(401).json({ msg: error });
    }
}
const deleteUser = async(req, res) => {
    try {
        const user = await User.deleteMany()
        res.send('deleted')
    } catch (error) {
        console.log(error);
    }

}

const login = async(req, res) => {
    const { email, password } = req.body
    console.log(email, password);
    if (!email || !password) {
        return res.status(401).json({ msg: 'Invalid email or password' });
    }
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(401).json({ msg: 'Invalid email or password' });
    }
    const token = await user.createJWT()
        // console.log(token)
    const isCorrectPassword = await user.comparePassword(password)
    if (!isCorrectPassword) {
        return res.status(401).json({ msg: 'Invalid email or password' });
    }
    res.status(200).json({ name: user.name, token })

}

module.exports = {
    login,
    signup,
    deleteUser
}