const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];
    if (bearerHeader) {
      const token = bearerHeader.split(" ")[1];
      jwt.verify(token, process.env.GENERATETOKEN, (err, authData) => {
        if (authData) {
          next();
        } else {
          res.status(401).send({
            message: err,
          });
        }
      });
    } else {
      res.status(400).send({
        message: "Token is required",
      });
    }
  } catch (error) {
    res.status(400).send({
      message: "Invalid token",
      subError: error.message,
    });
  }
};
