import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN_VALUE

  if (token == null) return res.sendStatus(401); // if there's no token

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // invalid token
    req.user = user;
    next(); // proceed if valid
  });
};

export default authenticateToken;