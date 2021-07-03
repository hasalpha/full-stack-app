const mongoose = require('mongoose');
const {Schema} = mongoose;

const imageSchema = new Schema({
    url: String,
    filename: String
});

imageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload', '/upload/w_100');
})

const productSchema = new Schema({
    name:{
        type: String,
        required: [true, 'Product name cannot be empty']
    },
    images:[imageSchema],
    geometry:
        {
            type:
            {
            type:String,
            enum: ['Point'],
            required: true
            },
            coordinates:{
                type:[Number],
                required: true
            }
        },
    destination: String,
    productDescription:{
        type:String,
        required:true,
        minLength: 10,
        maxLength: 100 
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
}, { toJSON:{virtuals: true}});

productSchema.virtual('properties.popUp').get(function(){
    return `<strong style="color:black;"><a href='/product/listing/${this._id}'>${this.name}</a>
            <p>${this.productDescription}</p></strong>`;
});

module.exports = mongoose.model('Product', productSchema);