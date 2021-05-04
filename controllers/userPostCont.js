const UserPost = require('../models/UserPost')

module.exports = {
  getPost: async (req, res) => {
    await UserPost.findOne({_id: req.params.id}, (err, post) => {
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
      let bool = false;
      await UserPost.findOne({_id: req.body.id}, (err, post) => {
        if(err) console.error(err);
        console.log(post);
        if(post.likedUsers.includes(req.user.username)) {
          bool = true;
          return res.json({message: 'exists'});
        }
      });
      console.log('test');
      if(!bool) {
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