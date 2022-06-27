const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const UserModel = require("../Models/UserModel");


// Register / Create user accounts
  // get credentials and user info from client
  // Bcrypt the password
  // save the user information in the database
  // log in the user
  

// Sign -in / Authentication
  // get credentials from client
  // verify they match what is in the database (use bcrypt again to verify)
  
  // AUTHORIZATION:
    // granting the client a JWT (json web token) that they can keep
      // so they dont have to give us the password each time


// on every request we need to check for a JWT to see if a user is signed in, and if they are, who they are.

const cleanUser = (userDocument) => {
  return {
    id: userDocument._id,
    firstName: userDocument.firstName,
    lastName: userDocument.lastName,
    email: userDocument.email,
    isAdmin: userDocument.isAdmin,
  }
};


const getToken = (userId) => {
  // Generate a token that the user can use to indicate that they are logged in
  var token = jwt.sign({ userId, iat: Date.now(), }, process.env.JWT_SECRET_KEY);

  return token;
};

const register = async (req, res, next) => {
  try {

    //get the user info
    const user = req.body.user;    

    // hash the password:
     // We need to hash the password because we don't want to keep a real copy of the password for security purposes.

     const {
       firstName,
       lastName,
       email,
       password,
       isAdmin,
      } = user;

      const hashedPassword = await bcrypt.hash(password, 10);

      console.log('hashedPassword: ', hashedPassword);
      
     // Save user info in database
     const userDocument = new UserModel({
      firstName,
      lastName,
      email,
      passwordHash: hashedPassword,
      isAdmin,
     });

     userDocument.save();

     // after we save we authorize the user
     const token = getToken(userDocument._id);

     res.send({ token, user: cleanUser(userDocument) });


  } catch (error){
    console.log('error: ', error);
  }
};



const signIn = async (req, res, next) => {
  try {
    const {
      email,
      password,
      } = req.body.credentials;    
      
      const foundUser = await UserModel.findOne({ email: email });

      console.log('user: ', foundUser);

      if(!foundUser){
        return res.status(401).json({error: "user not found or incorrect credentials"});
      }

      // if user has been found now lets check that the password matches.

      const passwordMatch = await bcrypt.compare(password, foundUser.passwordHash);

      // if the password is incorrect throw an error
      if(!passwordMatch){
        return res.status(401).json({error: "user not found or incorrect credentials"});
      }

      const token = getToken(foundUser._id);
      res.cookie('session_token', token);
     res.send({ user: cleanUser(foundUser) });


  } catch (error) {
    console.log('error: ', error)
  }

};


const UserService = { signIn, register };

module.exports = UserService;