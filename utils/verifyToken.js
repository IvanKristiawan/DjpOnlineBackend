const jwt = require("jsonwebtoken");
const { createError } = require("../utils/error.js");
const User = require("../User/models/UserModel.js");

const verifyUser = (req, res, next) => {
  const token = req.body.token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
  });

  if (req.params.length === 0) {
    if (req.params.id === req.user.id) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  } else {
    if (req.body._id === req.user.id) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  }
};

module.exports = {
  verifyUser,
};
