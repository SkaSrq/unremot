const jwtSecret  = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
const verifyJwt = () => (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    try {
      const decoded = jwt.verify(token, jwtSecret);
      req.user = decoded;
      next();
    } catch (error) {
        console.log(error);
      res.status(400).json({ message: 'Invalid token.' });
    }
  };
module.exports = verifyJwt;