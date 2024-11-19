import createHttpError from 'http-errors';
import { findUserById } from '../services/usersService.js';

export const checkToken = async (req, res, next) => {
  const auth = req.get('Authorization');
  if (!auth) {
    next(createHttpError(401, 'Unauthorization'));
    return;
  }

  const [bearer, token] = auth.split(' ', 2);
  if (bearer !== 'Bearer' || !token) {
    return next(createHttpError(401, 'Auth header should be of type Bearer'));
  }

  try {
    const { id } = jwt.verify(token, env('JWT_SECRET'));
    const user = await findUserById(id);
    if (!user || !user.token || user.token !== token) {
      next(createHttpError(401, 'Unauthorization'));
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    next(createHttpError(401, 'Invalid token'));
  }
};
