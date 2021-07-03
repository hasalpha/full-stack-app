// const bcrypt = require('bcrypt');
// const mongoose = require('mongoose');
// const {Schema} = mongoose;
// const userSchema = new Schema({
//     username:{
//         type: String,
//         required: true,
//         unique : true,
//         dropDups: true,
//         min: 4,
//         max: 10
//     },
//     password:{
//         type: String,
//         required: true,
//         min: 5,
//         max:20
//     }
// });
// userSchema.statics.checkCredentials = async function(username, password){
//     const foundUser = await this.findOne({username:username});
//     if(foundUser){
//         const result = await bcrypt.compare(password, foundUser.password);
//         if (!result){
//             return false;
//         }
//         return foundUser;
//     }else{
//         return false;
//     }
// };

// userSchema.pre('save', async function(next){
//     if(this.isModified('password'))
//         this.password = await bcrypt.hash(this.password, 12);
//     next();
// });
// const user = mongoose.model('user', userSchema);
// module.exports = user;
const mongoose = require('mongoose');
const {Schema} = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email:{
        type: String,
        required: [true, 'Email is required'],
        unique: true
    }
});
userSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
      next(new Error('Email address already exists!'));
    } else {
      next(error);
    }
  });
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);