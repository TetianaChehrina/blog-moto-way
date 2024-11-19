export const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(404).json({ message: 'Access denied. Admins only.' });
  }
  next();
};
