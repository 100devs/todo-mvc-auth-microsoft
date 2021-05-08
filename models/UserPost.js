const mongoose = require('mongoose')

const UserPostSchema = new mongoose.Schema({ //userpost schema
  createdAt: {
    type: Date,
    default: Date.now
  },
  img: {
    type: String,
    required: true
  },
  caption: { // desc
    type: String,
    required: true
  },
  // title: {
  //   type: String,
  //   required: true
  // },
  cloudinaryId: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  likedUsers: {
    type: [String],
    default: []
  },
  comments: {
    type: [String],
    default: []
  },
  username: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('UserPost', UserPostSchema);

// UserPost.find({userID: req.user.id}) - return an array with all the user's posts