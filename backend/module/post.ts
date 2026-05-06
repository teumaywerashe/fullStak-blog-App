import mongoose, { Document, Schema, Types } from 'mongoose'

export interface IPost extends Document {
  postHeader: string
  postText: string
  username: string
  createdBy: Types.ObjectId
}

const postSchema = new Schema<IPost>(
  {
    postHeader: { type: String },
    postText: { type: String },
    username: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: 'user' },
  },
  { timestamps: true }
)

export default mongoose.model<IPost>('Post', postSchema)
