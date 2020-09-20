const mongoose = require('mongoose');
const { Schema } = mongoose;
const { isEmail } = require('validator');
const userSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String
  },
  avatar: {
    type: String
  },
  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  following: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }]
});

module.exports = mongoose.model('user', userSchema);