import calculatePagination from '../middlewares/calculatePagination.js';
import parsePaginationParams from '../middlewares/parsePagination.js';
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from '../services/postsService.js';

export const getPostsByController = async (req, res, next) => {
  const { category, isFavourite, pagination } = req.body;

  const { page, perPage } = pagination
    ? parsePaginationParams(pagination)
    : { page: 1, perPage: 9 };

  const filters = {
    category,
    isFavourite,
  };

  const { posts, totalItems } = await getPosts(filters, page, perPage);

  const paginationData = calculatePagination(totalItems, perPage, page);

  res.json({
    data: posts,
    pagination: paginationData,
  });
};

export const createPostByController = async (req, res) => {
  const post = await createPost({ ...req.body, author: req.user._id });
  res.status(201).json(post);
};

export const updatePostByController = async (req, res) => {
  const { id } = req.params;
  const post = await updatePost(id, req.body);
  res.json(post);
};

export const deletePostByController = async (req, res) => {
  const { id } = req.params;
  await deletePost(id);
  res.status(204).end();
};
