export const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized: No user provided' });
  }

  if (req.user.role !== 'admin') {
    return res
      .status(403)
      .json({ message: 'Forbidden: Admin access required' });
  }

  next();
};
