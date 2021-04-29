const express = require('express')
const router = express.Router()
const postController = require('../controllers/posts')
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const multer = require("multer"); //images are uploaded on multer and stored on our server
const upload = multer({ dest: "public/uploads/" });
const { storage } = require("../middleware/multer")

router.get('/:id', ensureAuth, postController.getPosts)   // the colon means that you want to receive the URL segments as parameter

router.post('/createPost', postController.createPost)

router.put('/likePost/:id', postController.likePost) // /:id is the parameter. Since the path is set to :id  when you get to postController you can grab that id and use it.

router.delete('/deletePost/:id', postController.deletePost)

module.exports = router