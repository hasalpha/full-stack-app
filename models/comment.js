const mongoose = require('mongoose');
const {Schema} = mongoose;

const commentSchema = new Schema({
    author:{
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    rating:{
        type: Number
    },
    content:{
        type: String
    }
});

module.exports = mongoose.model('Comment', commentSchema);