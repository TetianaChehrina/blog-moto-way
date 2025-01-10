import Router from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createPostByController,
  deletePostByController,
  getPostByIdController,
  getPostsByController,
  updatePostByController,
} from '../controllers/postsController.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { checkToken } from '../middlewares/checkToken.js';
import { upload } from '../middlewares/upload.js';

const router = Router();

router.get('/', ctrlWrapper(getPostsByController));
router.get('/:id', ctrlWrapper(getPostByIdController));

router.post(
  '/',
  checkToken,
  isAdmin,
  upload.single('image'),
  ctrlWrapper(createPostByController),
);
router.patch(
  '/:id',
  checkToken,
  isAdmin,
  upload.single('image'),
  ctrlWrapper(updatePostByController),
);
router.delete('/:id', checkToken, isAdmin, ctrlWrapper(deletePostByController));

export default router;
