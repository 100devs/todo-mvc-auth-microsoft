const mongoose = require('mongoose')

const UserPostSchema = new mongoose.Schema({ //userpost schema
  createdAt: {
    type: Date,
    default: Date.now
  },
  imgName: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: {
    type: [String],
    default: []
  },
  userID: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('UserPost', UserPostSchema);
