import Router from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserController,
  logoutUser,
  refreshUser,
  registerUserController,
} from '../controllers/usersController.js';
import { checkToken } from '../middlewares/checkToken.js';

const router = Router();

router.post('/register', ctrlWrapper(registerUserController));
router.post('/login', ctrlWrapper(loginUserController));
router.post('/logout', checkToken, ctrlWrapper(logoutUser));
router.get('/current', checkToken, ctrlWrapper(refreshUser));
export default router;
