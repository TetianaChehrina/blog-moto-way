import { Post } from '../db/models/Post.js';
import { Comment } from '../db/models/Comment.js';

export const createComment = async ({ postId, content, authorId }) => {
  const comment = await Comment.create({
    content,
    author: authorId,
    post: postId,
  });
  await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });
  return comment;
};

export const deleteComment = async (commentId) =>
  Comment.findByIdAndDelete(commentId);

export const updateComment = async (commentId, data) => {
  return Comment.findByIdAndUpdate(
    commentId,
    { ...data },
    { new: true },
  ).populate('author', 'username');
};

export const getCommentsByPost = async (postId) => {
  return Comment.find({ post: postId }).populate('author', 'username');
};
