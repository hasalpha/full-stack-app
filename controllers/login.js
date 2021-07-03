module.exports.loginUser = async(req, res)=>{
    // const {username, password} = req.body;
    // const foundUser = await User.checkCredentials(username, password);
    // if(foundUser){
    //     req.flash('success', 'Welcome back!');
    //     req.session.user_id = foundUser._id;
    //     return res.redirect('/authenticated');
    //     }
    // else{
    //     req.flash('error', 'Incorrect Username or Password!');
    //     return res.redirect('/login');
    //     }
    const redirectURL = req.session.returnTo || '/home';
    req.flash('success', 'Welcome back!');
    delete req.session.returnTo;
    res.redirect(redirectURL);
}

module.exports.getLoginPage =  (req, res)=>{
    res.render(`login`);
}

module.exports.logoutUser = (req, res)=>{
    req.logout();
    req.flash('success', 'Logged out successfully!');
    res.redirect('/home');
}