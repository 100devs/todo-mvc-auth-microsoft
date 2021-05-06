const UserPost = require('../models/UserPost')

module.exports = {
  getPost: async (req, res) => {
    await UserPost.findOne({_id: req.params.id}, (err, post) => {
      console.log(post.likedUsers);
      if(err) console.error(err);
      else {
        console.log(post.img);
        res.render('singlePost', {post: post, username: req.user.username});
      }
    });
  },
  deletePost: async (req, res) => {
    try {
    console.log('test');
    await UserPost.findOneAndDelete({_id: req.body.id});
    console.log('Post has been deleted');
    res.json({message: 'done'});
    } catch(err) {
      console.error(err);
    }
  },
  likePost: async (req, res) => {
    try {
      console.log(req.user.username);
      let bool;
      await UserPost.findOne({_id: req.body.id})
      .then(doc => {
        console.log(doc);
        bool = doc.likedUsers.includes(req.user.username);
      });
      if(bool) {
        console.log('hits?');
        res.json({message: 'exists'});
      } else {
      let newCount = ++req.body.likes;
      await UserPost.findOneAndUpdate({_id: req.body.id}, {
        likes: newCount,
        $push: {likedUsers: req.user.username}
      });
      console.log('Likes updated');
      res.json({message: 'done'});
      }
    } catch (err) {
      console.error(err);
    }
  },
  commentPost: async (req, res) => {
    try {
      console.log('test');
      let formattedComment = `'${req.body.comment}' - ${req.user.username}`;
      await UserPost.findOneAndUpdate({_id: req.body.id}, {
        $push: {comments: formattedComment}
      });
      res.json({message: 'done'});
    } catch(err) {
      console.error(err);
    }
  }
}