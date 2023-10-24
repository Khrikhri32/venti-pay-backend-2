// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

function authenticateJWT(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = user;
    next();
  });
}

module.exports = authenticateJWT;
