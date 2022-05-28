const User = require("../models/user.mode");
const jwt = require("jsonwebtoken");
const { UnAuthenticatedError } = require("../errors");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnAuthenticatedError("Authantication Invalid");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnAuthenticatedError("Authantication Invalid");
  }
};

module.exports = auth;
