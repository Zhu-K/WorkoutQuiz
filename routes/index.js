const express = require('express');
const router  = express.Router();
const {ensureAuthenticated} = require('../config/auth') 
const path = require('path');

//main page
router.get('/', (req,res)=>{

    if (req.isAuthenticated()) {
        res.redirect('/workout/')
    } else {
        res.render('main', {
            title: "Main Welcome Page"
        });
    }
})

router.get('/quiz',ensureAuthenticated,(req,res)=>{
    res.render('quiz',{
        title: "Exercise Quiz",
    });
})


module.exports = router; 