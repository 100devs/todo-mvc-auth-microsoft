const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const {ensureAuth, ensureGuest} = require('../middleware/auth');

router.get('/', ensureGuest, homeController.getIndex) 

router.get('/dashboard', ensureAuth, homeController.getDashboard) 

module.exports = router