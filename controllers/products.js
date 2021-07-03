const Product = require('../models/product');
const mbxGeo = require('@mapbox/mapbox-sdk/services/geocoding');
const mapboxToken = process.env.MAPBOX_TOKEN;
const {cloudinary} = require('../cloudinary');
const geoCoder = mbxGeo({accessToken: mapboxToken});

module.exports.showProductForm = (req, res) => {
    res.render('product');
}

module.exports.createNewProduct = async (req, res)=>{
    try{
    const {product, description, location} = req.body;
    const loc = await geoCoder.forwardGeocode({
        query: req.body.location,
        limit: 1
    }).send();
    const newProduct = new Product({name: product, productDescription: description, destination:location});
    newProduct.geometry = loc.body.features[0].geometry;
    newProduct.author = req.user._id;
    newProduct.images = req.files.map(image => ({url: image.path, filename: image.filename}));
    await newProduct.save()
    req.flash('success', 'New product listed successfully!');
    res.redirect(`/product/listing/${newProduct._id}`);
    }catch(e){
        req.flash('error', e.message);
        res.redirect('/product');
    };
}

module.exports.showProductListing = async(req, res)=>{
    const result = await Product.find({});
    res.render('listing', {products: result});
}

module.exports.showProduct = async(req, res)=>{
    const {id} = req.params;
    const product = await Product.findById(id).populate('author').populate({
        path:'comments', populate:'author'
    });
    const user = req.user;
    req.session.returnTo = req.originalUrl;
    res.render('productDisplay', {user, product: product, url: req.url});
}

module.exports.showEditForm = async(req, res)=>{
    const {id} = req.params;
    const product = await Product.findById(id);
    const url = req.url.slice(0,-4);
    res.render("productEdit", {product, url});
}

module.exports.makeProductEdit = async(req, res)=>{
    try{
    const {id} = req.params;
    const {product, description} = req.body;
    // await Product.findByIdAndUpdate(id, {name: product, productDescription: description});
    const existingProduct = await Product.findById(id);
    existingProduct.name = product;
    existingProduct.productDescription = description;
    if(req.body.imageSelected){
        for(let img of req.body.imageSelected){
            await cloudinary.uploader.destroy(img);
        }
        await existingProduct.updateOne({$pull:{images:{filename:{$in:req.body.imageSelected}}}});
    }
    const imgs = req.files.map(image => ({url: image.path, filename: image.filename}));
    existingProduct.images.push(...imgs);
    req.flash('success', 'Updated successfully!');
    res.redirect(`/product/listing/${id}`);}
    catch(e){
        req.flash('error', e.message);
        res.redirect(`/product/listing/${id}/edit`);
    }
}

module.exports.deleteProduct = async(req, res)=>{
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id);
    for(let img of product.images){
        await cloudinary.uploader.destroy(img.filename);
    }
    req.flash('success', 'Product deleted successfully!');
    res.redirect('/product/listing');
}