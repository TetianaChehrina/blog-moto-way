import { Post } from '../db/models/Post.js';
import { deletePost } from '../services/postsService.js';

import calculatePagination from '../middlewares/calculatePagination.js';
import { parsePaginationParams } from '../middlewares/parsePagination.js';

export const getPostsByController = async (req, res) => {
  const { category } = req.query;
  const { page, perPage } = parsePaginationParams(req.query);

  const query = {};
  if (category) query.category = category;

  const totalItems = await Post.countDocuments(query);

  const posts = await Post.find(query)
    .populate('author', 'username')
    .skip((page - 1) * perPage)
    .limit(perPage);

  const pagination = calculatePagination(totalItems, perPage, page);

  return res.json({
    data: { posts },
    pagination,
  });
};

export const getPostByIdController = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id).populate('author', 'username');

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  res.json(post);
};

export const createPostByController = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    if (!title || !content || !category) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const post = await Post.create({
      title,
      content,
      category,
      imageUrl,
      author: req.user._id,
    });

    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updatePostByController = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    console.log('Request body:', req.body);

    const imageUrl = req.file
      ? `/uploads/${req.file.filename}`
      : req.body.imageUrl;

    if (!title || !content || !category) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, category, imageUrl },
      { new: true },
    );

    res.json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deletePostByController = async (req, res) => {
  const { id } = req.params;
  await deletePost(id);
  res.status(204).end();
};
