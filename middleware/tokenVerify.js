const jwt = require("jsonwebtoken")

const tokenVerify = (req, res, next) => {
    const authHeader = req.headers.token
    if (authHeader) {
        const splitToken = authHeader.split(" ")[1]
        
        jwt.verify(splitToken, process.env.JWT_SECURITY, (err, user) => {
            if (err)  { 
                res.status(403).json("Token is not valid!") 
            }
           
            req.user = user
            next()
        });
    } else {
        return res.status(401).json("Your not authenticated!")
    }
};

const  tokenVerifyAuthorization = (req, res, next) => {
    tokenVerify(req, res, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  };

module.exports = {
    tokenVerify,
    tokenVerifyAuthorization
}