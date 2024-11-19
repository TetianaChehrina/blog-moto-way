import createHttpError from 'http-errors';
import {
  createUser,
  findUserByEmail,
  resetUserToken,
  updateUserWithToken,
} from '../services/usersService.js';

export const registerUserController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await findUserByEmail(email);
    if (user) throw createHttpError(409, 'Email in use');

    const newUser = await createUser({ username, email, password });

    res.json({
      token: newUser.token,
      user: {
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error('Register user error:', error);
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    throw createHttpError(401, 'User not found');
  }

  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) {
    throw createHttpError(401, 'Invalid credentials');
  }

  const updatedUser = await updateUserWithToken(user._id);

  res.json({
    token: updatedUser.token,
    user: {
      username: updatedUser.username,
      email: updatedUser.email,
    },
  });
};

export const logoutUser = async (req, res) => {
  await resetUserToken(req.user._id);
  res.status(204).end();
};
