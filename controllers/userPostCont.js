const userPosts = require('../models/UserPost')

module.exports = {  
    getPosts: async (req,res)=>{
        try{
            const selectedPost = await userPosts.find({id: req.params.id}) //TODO: Change to db name
            res.render('post.ejs', {selectedPost: selectedPost}) //TODO: Change to db and form names
        }catch(err){
            console.log(err)
        }
    },
    createPost: async (req, res)=>{
        try{
            await userPosts.create({
              title: req.body.title,
              desc: req.body.description,
              createdAt: req.body.date,
              imgName: req.body.imageURL,
              userID: req.user.userID
            }) //TODO: Change to form names
            console.log('Your post has been created!')
            res.redirect('/dashboard') //TODO: Modify to desired redirect
        }catch(err){
            console.log(err)
        }
    },

    likePost: async (req, res)=>{ //PLACEHOLDER
        try{ 
            await userPosts.findOneAndUpdate({id: req.body.id},{
              //likes: Number(req.body.likes)++,
            })
            //console.log('Like has been modified!')
            //res.redirect('/:'+ req.body.id) 
        }catch(err){
            console.log(err)
        }
    },
    deletePost: async (req, res)=>{ //PLACEHOLDER
        try{ 
          //TODO: Verify user is owner of post
            //await userPosts.findOneAndDelete({id: req.body.id})
            //console.log('Post has been deleted!')
            //res.redirect('/todos') 
        }catch(err){
            console.log(err)
        }
    },
}
