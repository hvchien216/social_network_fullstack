const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  text: {
    type: String,
    require: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'post'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  }

})

module.exports = mongoose.model('comment', commentSchema);