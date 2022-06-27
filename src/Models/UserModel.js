const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true},
  lastName: { type: String, required: true},
  email: { type: String, required: true, unique: true},
  passwordHash: { type: String, required: true},
  isAdmin: { type: Boolean, required: true, default: false},
});

const UserModel = mongoose.model('User', userSchema);


module.exports = UserModel;