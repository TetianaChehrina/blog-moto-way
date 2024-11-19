import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: {
    type: String,
    required: true,
    enum: ['travel', 'fashion', 'food', 'technology', 'lifestyle'],
  },
  isFavourite: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

export const Post = mongoose.model('post', postSchema);
