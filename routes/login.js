const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');
const {checkUserLoggedIn} = require('../middleware');
const {loginUser, getLoginPage, logoutUser} = require('../controllers/login');

router.get('/', getLoginPage);

router.post('/', passport.authenticate("local", {failureFlash: true, failureRedirect:'/login'}), loginUser);

router.get('/logout', checkUserLoggedIn, logoutUser);

module.exports = router;