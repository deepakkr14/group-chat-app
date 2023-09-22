const jwt = require("jsonwebtoken");
const User = require("./user-model");
const secretKey = "secretkey";

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
  
    const user = jwt.verify(token, secretKey);
    await User.findByPk(user.userId).then((user) => {
      
      req.user = user;
      next();
    });
  } catch (error) {
    console.log(error  + '-------------------');
   res.status(401).json({ success: false,error});
  }
};

module.exports = authenticate;
