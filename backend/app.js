const express = require('express')
const app = express();
require('dotenv').config()
const cors = require('cors');
const port = process.env.PORT || 3000
const postRouter = require('./route/postRout');
const authRouter = require('./route/authRoute')
const connectDB = require('./db/connect');
app.use(express.json())
app.use(cors())
app.use(express.static('public'))
app.use('/api/v1', authRouter, postRouter)


const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => console.log('server listeting on port ', port))
    } catch (error) {
        console.log(error);
    }

}
start()