import { User } from '../db/models/User.js';

export const createUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = await User.create({ ...userData, password: hashedPassword });
  return updateUserWithToken(user._id);
};

export const updateUserWithToken = (id) => {
  const token = jwt.sign({ id }, env('JWT_SECRET'), { expiresIn: '1h' });
  return User.findByIdAndUpdate(id, { token }, { new: true });
};

export const findUserById = async (id) => User.findById(id);

export const findUserByEmail = async (email) => User.findOne({ email });

export const resetUserToken = async (userId) =>
  User.findByIdAndUpdate(userId, { token: null });
