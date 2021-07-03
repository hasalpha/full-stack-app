const User = require('../models/user');
module.exports.getRegistrationForm = (req, res)=>{
    res.render('register');
};

module.exports.registerUser = async(req, res, next)=>{
    try{
        const {username, password, email} = req.body;
        const newUser = new User({username: username, email: email});
        const user = await User.register(newUser, password);
        req.login(user, err=>{
            if(err){
                return next(err);
            }
            req.flash('success', 'Thank for you joining!');
            res.redirect('/home');
        })
    }catch(e){
        req.flash('error', e.message);
        res.redirect('/register');
    }
}