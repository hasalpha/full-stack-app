const Product = require('../models/product');
const Comment = require('../models/comment');
module.exports.getProductListing = async(req, res)=>{
    res.redirect(`/product/listing/${req.params.id}`);
}

module.exports.postComment = async(req, res)=>{
    const {rating, comment} = req.body;
    const {id} = req.params;
    const product = await Product.findById(id);
    const newComment = new Comment({rating:rating, content:comment});
    newComment.author = req.user._id;
    await newComment.save();
    product.comments.push(newComment._id);
    await product.save();
    req.flash('success', 'Comment added succesfully!');
    res.redirect(`/product/listing/${req.params.id}`);
}

module.exports.deleteComment = async(req, res)=>{
    const {id, commentId} = req.params;
    const product = await Product.findById(id).populate('comments');
    const comment = await Comment.findByIdAndDelete(commentId);
    let index = null;
    product.comments.forEach(existingComment => {
        if(existingComment._id.equals(comment._id)){
            index = product.comments.indexOf(existingComment);
            return;
        }});
    product.comments.splice(index, 1);
    req.flash('success', 'Comment deleted!');
    res.redirect(`/product/listing/${req.params.id}`);
}