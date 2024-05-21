import jwt from 'jsonwebtoken';
import User from '../models/users.js';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) return res.sendStatus(403);

    try {
      const loggedInUser = await User.findById(user.userId);
      if (!loggedInUser) return res.sendStatus(403);

      req.user = loggedInUser;
      next();
    } catch (error) {
      return res.sendStatus(500);
    }
  });
};

const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.sendStatus(403);
    }
    next();
  };
};

export { authenticateToken, authorizeRole };
