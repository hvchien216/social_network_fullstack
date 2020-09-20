const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  text: {
    type: String,
    require: true,
  },
  photo: {
    type: String
  },
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comment'
  }],

}, { timestamps: true })

module.exports = mongoose.model('post', postSchema)