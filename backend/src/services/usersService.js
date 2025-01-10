import { User } from '../db/models/User.js';
import bcrypt from 'bcryptjs';

export const createUser = async (userData) => {
  if (!userData.password) {
    throw new Error('Password is required');
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const user = await User.create({
    ...userData,
    password: hashedPassword,
    role: userData.role || 'user',
  });

  return user;
};

export const updateUserToken = async (userId, token) =>
  User.findByIdAndUpdate(userId, { token }, { new: true });

export const findUserByEmail = async (email) => User.findOne({ email });

export const clearUserToken = async (userId) =>
  User.findByIdAndUpdate(userId, { token: null });

export const findUserById = async (id) => User.findById(id);
export const findUserByToken = async (token) => User.findOne({ token });
