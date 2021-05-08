const express = require('express') //copied and pasted from microsoft nothing new needs to be changed
const passport = require('passport')
const config = require('../config/config')
const router = express.Router()
const loginCont = require('../controllers/loginCont');
const signCont = require('../controllers/signCont');

router.get('/', signCont.getPage);
router.post('/', signCont.postUser);
router.get('/logout', signCont.logout);

module.exports = router
