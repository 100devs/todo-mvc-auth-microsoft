//temp file for testing. dont delete this.
const express = require('express');
const router = express.Router();
const todoCont = require('../controllers/todos');
const {ensureAuth, ensureGuest} = require('../middleware/auth');

router.get('/', ensureAuth, todoCont.getPage);

module.exports = router;