import Router from 'express';
import {
  createCommentByController,
  deleteCommentByController,
  getCommentsController,
} from '../controllers/commentsController.js';
import { checkToken } from '../middlewares/checkToken.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const router = Router();

router.get('/:postId', ctrlWrapper(getCommentsController));
router.post('/', checkToken, ctrlWrapper(createCommentByController));
router.delete(
  '/:commentId',
  checkToken,
  isAdmin,
  ctrlWrapper(deleteCommentByController),
);

export default router;
