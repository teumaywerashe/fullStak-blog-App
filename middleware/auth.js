// middleware/auth.js
const jwt = require('jsonwebtoken');


const auth = async(req, res, next) => {
    // console.log(req)
    try {
        // 1️⃣ Check if Authorization header exists
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(500).json({
                msg: 'Authentication invalid'
            });
        }

        // 2️⃣ Extract token
        const token = authHeader.split(' ')[1];

        // 3️⃣ Verify token
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        // 4️⃣ Attach user info to req.user
        req.user = { userId: payload.userID, name: payload.name };

        next(); // continue to the route handler
    } catch (error) {
        console.log(error);

        return res.status(401).json({ msg: 'Authentication invalid or expired' });
    }
};

module.exports = auth;