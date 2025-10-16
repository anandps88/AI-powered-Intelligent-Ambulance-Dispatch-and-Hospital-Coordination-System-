require('dotenv').config();

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    // Check if authorization header exists
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'No authorization token provided'
      });
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.split(' ')[1];
    
    // Validate token (in production, this would verify JWT)
    if (token !== process.env.AUTH_TOKEN) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }

    // Token is valid, proceed to next middleware/route
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Authentication failed',
      error: error.message
    });
  }
};

module.exports = authMiddleware;
