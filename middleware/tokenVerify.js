const { json } = require("express/lib/response");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

const tokenVerify = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const splitToken = authHeader.split(" ")[1];
    console.log("split", splitToken);
    jwt.verify(splitToken, process.env.JWT_SECURITY, (err, user) => {
      if (err) {
        console.log(err);
        res.status(403).json("Token is not valid!");
      }

      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("Your not authenticated!");
  }
};

// authorization token
const tokenVerifyAuthorization = (req, res, next) => {
  tokenVerify(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

// admin token
const verifyTokenAdmin = (req, res, next) => {
  tokenVerify(req, res, () => {
    console.log("myadmin", req.user.isAdmin == true);

    if (req.user.isadmin) {
      next();
    } else {
      res.status(403).json("Your not admin, you can't save data in database!");
    }
  });
};

module.exports = {
  tokenVerify,
  tokenVerifyAuthorization,
  verifyTokenAdmin,
};
