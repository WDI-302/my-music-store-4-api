var jwt = require('jsonwebtoken');
const UserModel = require("../Models/UserModel");

const checkAuth = async (req, res, next) => {
  
  try {
    const { session_token: sessionToken } = req.cookies;
    if(!sessionToken){
      return next();
    }
    
    const { userId, iat } = jwt.verify(sessionToken, process.env.JWT_SECRET_KEY);

    const foundUser = await UserModel.findOne({_id: userId});

    req.user = foundUser;
    return next();
    
  } catch (error) {
    console.log('error: ', error);
    return res.status(401).json({error: "user not found or incorrect credentials"});
  }

};

const AuthorizationService = {
  checkAuth
};

module.exports = AuthorizationService;