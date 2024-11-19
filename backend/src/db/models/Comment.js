import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  date: { type: Date, default: Date.now },
});

export const Comment = mongoose.model('Comment', commentSchema);
