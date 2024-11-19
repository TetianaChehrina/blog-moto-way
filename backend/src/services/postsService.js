import { Post } from '../db/models/Post.js';

export const getPosts = async (filters, perPage, page) => {
  const query = {};

  if (filters.category) {
    query.category = filters.category;
  }

  if (filters.isFavourite !== undefined) {
    query.isFavourite = filters.isFafourite;
  }

  const totalItems = await Post.countDocuments(query);

  const posts = await Post.find(query)
    .populate('author', 'username')
    .skip((page - 1) * perPage)
    .limit(perPage);

  return { posts, totalItems };
};

export const createPost = async (postData) => {
  const post = await Post.create(postData);
  return post;
};

export const updatePost = async (id, data) => {
  const updatedPost = await Post.findByIdAndUpdate(
    id,
    { ...data },
    { new: true },
  ).populate('author', 'username');

  return updatedPost;
};

export const deletePost = async (id) => Post.findByIdAndDelete(id);
