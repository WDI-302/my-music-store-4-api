const express = require('express');
const UserService = require('../Services/UserService');


const userRouter = express.Router();

// This becomes the file with all your user routes:
userRouter.post('/sign-in', async (req, res, next) => {

  return UserService.signIn(req, res, next);
});

userRouter.post('/register', async (req, res, next) => {
  console.log('register')

  return UserService.register(req, res, next);
});

module.exports = userRouter;