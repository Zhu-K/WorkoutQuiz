const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const app = express();
const flash = require('connect-flash');
const session = require('express-session');
const passport = require("passport");
const expressLayouts = require('express-ejs-layouts');

//passport config:
require('./config/passport')(passport)
//mongoose
const uri = 'mongodb+srv://musclebuddy:stronk@cluster0.cemal.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
//mongoose.connect('mongodb://localhost/test',{useNewUrlParser: true, useUnifiedTopology : true})
mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology : true})
.then(() => console.log('connected...'))
.catch((err)=> console.log(err));

//EJS
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.set('view engine','ejs');
app.use(expressLayouts);
//BodyParser
app.use(express.urlencoded({extended : false}));
//express session
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req,res,next)=> {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error  = req.flash('error');
    next();
    })
    
//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));
app.use('/workout',require('./routes/workout'));

var port_number = process.env.PORT || 80; //server.listen(process.env.PORT || 3000);
app.listen(port_number); 