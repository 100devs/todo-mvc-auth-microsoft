const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const {ensureAuth, ensureGuest} = require('../middleware/auth');

router.get('/', ensureGuest, homeController.getIndex) 

router.get('/dashboard', ensureAuth, homeController.getDashboard) 

router.get('/profile', ensureAuth, homeController.getProfile) 

router.get('/profile/:username', ensureAuth, homeController.getOtherProfile);

module.exports = router