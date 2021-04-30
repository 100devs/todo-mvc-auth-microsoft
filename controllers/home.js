const userPostsdb = require('../models/UserPost')

module.exports = {
    getIndex: (req,res)=>{
      res.render('index.ejs')
    },
    getDashboard: async (req,res) => {
      try{
            const allPosts = await userPostsdb.find() 
            res.render('dashboard.ejs', {userPosts: allPosts}) 
        }catch(err){
            console.log(err)
        }
    },
}