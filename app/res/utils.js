
const jwt = require('jsonwebtoken');

module.exports = {
  authenticateToken: (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, process.env.TOKEN_SECRET, (err) => {
      if (err) return res.sendStatus(403);
      next(); 
    });
  },
  generateAccessToken: (id) => {
    return jwt.sign({id: id}, process.env.TOKEN_SECRET, { expiresIn: '12h' });
  }
}