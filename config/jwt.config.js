const jwt = require("jsonwebtoken");
 
module.exports.authenticate = (req, res, next) => {
  jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY, (err, payload) => {
    if (err) { 
      console.log('no token')
      res.status(401).json({verified: false});
    } else {
      next();
    }
  });
}