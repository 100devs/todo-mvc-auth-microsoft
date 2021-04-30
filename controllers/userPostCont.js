const UserPost = require('../models/UserPost')

module.exports = {
  getPost: async (req, res) => {
    await UserPost.findOne({_id: req.params.id}, (err, post) => {
      if(err) console.error(err);
      else {
        console.log(post.imgName);
        res.render('singlePost', {post: post, username: req.user.username});
      }
    });
  }
}

// module.exports = {  
//     getPosts: async (req,res)=>{
//         try{
//             const selectedPost = await userPosts.find({id: req.params.id}) //TODO: Change to db name
//             res.render('post.ejs', {selectedPost: selectedPost}) //TODO: Change to db and form names
//         }catch(err){
//             console.log(err)
//         }
//     },
//     createPost: async (req, res)=>{
//       try{
//             await userPosts.create({
//               caption: req.body.caption,
//               username: req.user.username,
//               imgName: req.file.filename,
//             }) //TODO: Change to form names
//             console.log('Your post has been created!')
//             res.redirect('/dashboard') //TODO: Modify to desired redirect
//         }catch(err){
//             console.log(err)
//         }
//     },

//     likePost: async (req, res)=>{ //PLACEHOLDER
//         try{ 
//             await userPosts.findOneAndUpdate({id: req.body.id},{
//               //likes: Number(req.body.likes)++,
//             })
//             //console.log('Like has been modified!')
//             //res.redirect('/:'+ req.body.id) 
//         }catch(err){
//             console.log(err)
//         }
//     },
//     deletePost: async (req, res)=>{ //PLACEHOLDER
//         try{ 
//           //TODO: Verify user is owner of post
//             //await userPosts.findOneAndDelete({id: req.body.id})
//             //console.log('Post has been deleted!')
//             //res.redirect('/todos') 
//         }catch(err){
//             console.log(err)
//         }
//     },
// }