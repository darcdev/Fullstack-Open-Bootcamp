const jwt = require("express-jwt");
const config = require("../utils/config");

const tokenValidator = (req, res, next) => {
  return jwt({ secret: config.JWT_SECRET_KEY, algorithms: ["HS256"] });
};

module.exports = tokenValidator;
