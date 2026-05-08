import mongoose from 'mongoose'

const connectDB = async (url: string): Promise<void> => {
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  } as any)
}

export default connectDB
