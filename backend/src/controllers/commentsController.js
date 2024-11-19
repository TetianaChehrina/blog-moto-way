import {
  createComment,
  deleteComment,
  getCommentsByPost,
  updateComment,
} from '../services/commentsService.js';

export const createCommentByController = async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;

  const comment = await createComment({
    postId,
    content,
    authorId: req.user._id,
  });

  res.status(201).json(comment);
};

export const deleteCommentByController = async (req, res) => {
  const { commentId } = req.params;
  await deleteComment(commentId);
  res.status(204).end();
};

export const updateCommentByController = async (req, res) => {
  const { commentId } = req.params;
  const { data } = req.body;
  const updateComment = await updateComment(commentId, data);
  res.json(updateComment);
};

export const getCommentsController = async (req, res) => {
  const { postId } = req.params;
  const comments = await getCommentsByPost(postId);

  res.status(201).json(comments);
};
