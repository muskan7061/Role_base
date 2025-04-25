const jwt = require('jsonwebtoken');
const db = require("../../rc/models")


const authenticate = async (req, res, next) => {
  const token =req.headers.authorization?.split(" ")[1]; // req.cookies?.token || 
  console.log("req.headers.authorization===>", req.headers.authorization );
  
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  console.log("token=====", token);
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded===>",decoded.id);
    const user = await db.Register.findByPk(decoded.id);
    
    console.log("id====",decoded.id);
    
    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = user;
    console.log( "req====",req.user );
    
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};

module.exports = { authenticate, authorize };
