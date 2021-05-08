const express = require('express')
const router = express.Router()
const postController = require('../controllers/userPostCont')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/:id', postController.getPost)   // the colon means that you want to receive the URL segments as parameter

router.delete('/deletePost', postController.deletePost);

router.put('/likePost', postController.likePost);

router.put('/commentPost', postController.commentPost);

// router.post('/createPost', postController.createPost)

// router.put('/likePost/:id', postController.likePost) // /:id is the parameter. Since the path is set to :id  when you get to postController you can grab that id and use it.

// //router.post('/comment',postController.createComment)

// router.delete('/deletePost/:id', postController.deletePost)

module.exports = router