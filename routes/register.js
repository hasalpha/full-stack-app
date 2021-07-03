const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const {getRegistrationForm, registerUser} = require('../controllers/register');
const catchAsync = fn => (...params) => fn(...params).catch((e)=>console.log(e)); 

router.get('/', getRegistrationForm);

router.post('/', registerUser);

module.exports = router;