import Router from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserController,
  logoutUser,
  registerUserController,
} from '../controllers/usersController.js';
import { checkToken } from '../middlewares/checkToken.js';

const router = Router();

router.post('/signup', ctrlWrapper(registerUserController));
router.post('/login', ctrlWrapper(loginUserController));
router.post('/logout', checkToken, ctrlWrapper(logoutUser));

export default router;
