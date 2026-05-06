import mongoose from 'mongoose'

const connectDB = async (url: string): Promise<void> => {
  await mongoose.connect(url)
}

export default connectDB
