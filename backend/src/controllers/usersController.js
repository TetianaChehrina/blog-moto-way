import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import {
  clearUserToken,
  createUser,
  findUserByEmail,
  updateUserToken,
} from '../services/usersService.js';
import { env } from '../utils/env.js';
import bcrypt from 'bcryptjs';
import { User } from '../db/models/User.js';

export const registerUserController = async (req, res) => {
  const { username, email, password, role } = req.body;

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw createHttpError(409, 'Email already in use');
  }

  const isFirstUser = (await User.countDocuments()) === 0;
  const assignedRole = isFirstUser ? 'admin' : role || 'user';

  if (role === 'admin' && !isFirstUser) {
    throw createHttpError(403, 'Admin user already exists');
  }

  const newUser = await createUser({
    username,
    email,
    password,
    role: assignedRole,
  });

  res.status(201).json({
    message: 'User created successfully',
    user: {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
    },
  });
};

export const loginUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) {
      throw createHttpError(401, 'User not found');
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      throw createHttpError(401, 'Invalid credentials');
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      env('JWT_SECRET'),
      { expiresIn: '1h' },
    );

    await updateUserToken(user._id, token);

    res.json({
      token,
      user: {
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    await clearUserToken(req.user.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export const refreshUser = (req, res) => {
  const { username, email, role, id } = req.user;
  res.json({
    username,
    email,
    role,
    id,
  });
};
