const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Token not provided"
      });
    }
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, "countryapijwt");

    req.user = decoded;

    next();

  } catch (err) {

    return res.status(401).json({
      success: false,
      message: "Invalid Token"
    });

  }
};

module.exports = auth;