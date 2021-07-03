const Product = require('./models/product');
const Comment = require('./models/comment');
module.exports.checkUserLoggedIn = (req, res, next) =>{
    if(req.isAuthenticated()){
        return next();
    }
    req.session.returnTo = req.originalUrl;
    req.flash('error', 'You must be signed in!');
    res.redirect('/login');
}

module.exports.checkAuthorization = async (req, res, next)=>{
    const {id} = req.params;
    const product = await Product.findById(id,'author').populate('author', 'email');
    if(req.user.email == product.author.email)
        return next();
    req.flash('error', 'You do not have permission!');
    res.redirect(`/product/listing/${id}`);
}

module.exports.checkCommentAuthorization = async (req, res, next)=>{
    const {commentId} = req.params;
    const comment= await Comment.findById(commentId, 'author').populate('author', 'email');
    if(req.user.email == comment.author.email)
        return next();
    req.flash('error', 'You do not have permission!');
    res.redirect(`/product/listing/${req.params.id}`);
}