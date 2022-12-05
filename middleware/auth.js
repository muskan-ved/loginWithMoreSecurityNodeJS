const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];
    const xAccessAuthorization = req.headers["x-access-authorization"];

    if (bearerHeader && xAccessAuthorization) {
      const token = bearerHeader.split(" ")[1];
      const xAccesstoken = xAccessAuthorization;

      jwt.verify(xAccesstoken, process.env.GENERATETOKEN, (err, authDataa) => {
        if (authDataa) {
          jwt.verify(token, process.env.LOGINKEY, (err, authData) => {
            if (authData) {
              next();
            } else {
              res.status(401).send({
                message: err,
              });
            }
          });
        } else {
          res.status(401).send({
            message: err,
          });
        }
      });
    } else {
      if (!req.headers["x-access-authorization"]) {
        res.status(400).send({
          message: "Authorization Token is required",
        });
      } else {
        res.status(400).send({
          message: "Login Token is required",
        });
      }
    }
  } catch (error) {
    res.status(400).send({
      message: "invalid Token",
      subError: error.message,
    });
  }
};
