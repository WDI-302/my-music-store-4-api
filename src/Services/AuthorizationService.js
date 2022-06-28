var jwt = require('jsonwebtoken');
const UserModel = require("../Models/UserModel");

const checkAuth = async (req, res, next) => {
  
  try {
    const { session_token: sessionToken } = req.cookies;
    console.log('sessionToken: ', sessionToken);
    if(!sessionToken){
      return next();
    }
    
    const { userId, iat } = jwt.verify(sessionToken, process.env.JWT_SECRET_KEY);


    // If the token is over 30 days old return an error and tell them to log in again
    if(iat < (Date.now() - (30 * 24 * 60 * 60))){
      return res.status(401).json({error: "invalid session. please log in again"});
    }

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