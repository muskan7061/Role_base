const jwt = require("jsonwebtoken");
const db = require("../../rc/models");

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await db.Register.findByPk(decoded.id, {
      include: {
        model: db.Role,
        as: "roles",
        attributes: ["role"],
      },
    });

    if (!user) return res.status(401).json({ message: "User not found" });
    req.user = user;
    next();

  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const authorize = (roles) => {
  return (req, res, next) => {
    const userRole = req.user.roles.dataValues.role;
    // console.log("===",  req.user);
    // console.log("===", req.user.roles.dataValues);
    if (!roles.includes(userRole)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};

module.exports = { authenticate, authorize };
