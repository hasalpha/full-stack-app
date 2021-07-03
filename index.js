if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const express = require('express');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const path = require('path');
const register = require('./routes/register');
const login = require('./routes/login');
const methodOverride = require('method-override');
const mongoDBStore = require('connect-mongo');
const product = require('./routes/crudProduct');
const comment = require('./routes/crudComment');
const session = require('express-session');
const app = express();
const crypto = require('crypto');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('./models/user');
const Product = require('./models/product');
const prodUrl = `mongodb://localhost:27017/userDB`;
const secret = process.env.SECRET || crypto.randomBytes(20).toString("hex");
const store = new mongoDBStore({
    secret,
    touchAfter: 60*60*24,
    mongoUrl: prodUrl
});
store.on('error', (e)=>console.log(e));
const sessionConfiguration = {
    store,
    secret,
    resave: true,
    saveUninitialized: true,
    expiration: Date.now() + 1000*60*60*24*7
}
mongoose.connect(prodUrl,{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true}).then(()=>{console.log("Connected to the database")})
.catch(e=>console.log(e));
app.set('views', path.join(__dirname, `views`));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sessionConfiguration));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next)=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    res.locals.currentPage = req.originalUrl;
    next();
})
app.use('/login', login);
app.use('/register', register);
app.use('/product', product);
app.use('/comment', comment);
const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log('Connected to port '+port));
app.get('/home',async(req, res)=>{
    const products = await Product.find({});
    if(req.session.returnTo){
        delete req.session.returnTo;
    }
    res.render('home', {products});});

app.get('*', (req, res)=>{
    res.render('cover');
})