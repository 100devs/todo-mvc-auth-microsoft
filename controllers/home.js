const userPostsdb = require('../models/UserPost')

module.exports = {
    getIndex: (req,res)=>{
      res.render('index.ejs')
    },
    getDashboard: async (req,res) => {
      try{
            let allPosts = await userPostsdb.find();
            allPosts = allPosts.reverse();
            res.render('dashboard.ejs', {userPosts: allPosts}) 
        }catch(err){
            console.log(err)
        }
    },
    getProfile: async (req, res) => {
      try {
        const userPosts = await userPostsdb.find({username:req.user.username});
        //.filter(el => el.username == req.user.username);
        // console.log(userPosts)
        res.render('profile', {
          userPosts,
          username: req.user.username,
          other: false
        })
      } catch(err) {
        console.log(err)
      }
    },
    getOtherProfile: async (req, res) => {
      try {
        const userPosts = await userPostsdb.find({username:req.params.username});
        //.filter(el => el.username == req.user.username);
        // console.log(userPosts)
        res.render('profile', {
          userPosts,
          username: req.params.username,
          other: true
        })
      } catch(err) {
        console.error(err);
      }
    }
}