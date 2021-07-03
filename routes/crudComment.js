const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Product = require('../models/product');
const {checkUserLoggedIn, checkCommentAuthorization} = require('../middleware');
const {getProductListing, postComment, deleteComment} = require('../controllers/comments');

router.get('/:id', checkUserLoggedIn, getProductListing);

router.get('/:id/:commentID', checkUserLoggedIn, getProductListing);

router.post('/:id', checkUserLoggedIn, postComment);

router.delete('/:id/:commentId', checkUserLoggedIn, checkCommentAuthorization, deleteComment)

module.exports = router;