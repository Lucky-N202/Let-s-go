const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Authorization token not provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Add the decoded user ID to the request object
    req.userId = decoded.userId;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
