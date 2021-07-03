const express = require('express');
const router = express.Router();
const {checkUserLoggedIn, checkAuthorization} = require('../middleware');
const {showProductForm, createNewProduct, showProductListing, showProduct, showEditForm, makeProductEdit, deleteProduct} = require('../controllers/products');
var multer  = require('multer');
const {storage} = require('../cloudinary');
var upload = multer({ storage});

router.get('/', checkUserLoggedIn, showProductForm);

router.post('/', checkUserLoggedIn, upload.array('display'), createNewProduct);

router.get('/listing', showProductListing);

router.get('/listing/:id', showProduct);

router.get('/listing/:id/edit', checkUserLoggedIn, checkAuthorization, showEditForm);

router.put('/listing/:id', checkUserLoggedIn, checkAuthorization, upload.array('display'), makeProductEdit);

router.delete('/listing/:id', checkUserLoggedIn, checkAuthorization, deleteProduct);

module.exports = router;