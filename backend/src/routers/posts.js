import Router from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createPostByController,
  deletePostByController,
  getPostsByController,
  updatePostByController,
} from '../controllers/postsController.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const router = Router();

router.get('/', ctrlWrapper(getPostsByController));
router.post('/', isAdmin, ctrlWrapper(createPostByController));
router.patch('/:id', isAdmin, ctrlWrapper(updatePostByController));
router.delete('/:id', isAdmin, ctrlWrapper(deletePostByController));

export default router;
