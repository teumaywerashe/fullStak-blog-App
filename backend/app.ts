import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './db/connect'
import authRouter from './route/authRoute'
import postRouter from './route/postRout'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
app.use('/api/v1', authRouter, postRouter)

const start = async (): Promise<void> => {
  try {
    await connectDB(process.env.MONGO_URI as string)
    app.listen(port, () => console.log(`Server listening on port ${port}`))
  } catch (error) {
    console.log(error)
  }
}

start()
