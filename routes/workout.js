const express = require('express');
const { redirect } = require('express/lib/response');
const router = express.Router();
const Workout = require("../models/workout");


router.post('/new',(req,res)=>{
    if (req.isAuthenticated()) {
        console.log(req.body);
        
        var {_, exerciseSum, intensity} = req.body;
        console.log('User: ' + req.user.email + ' Type: ' + exerciseSum + ' intensity: ' + intensity);

        const date = new Date();
        //date.setHours(0, 0, 0);
        const curDate = date.toDateString();
        
        Workout.updateOne({email: req.user.email, date: curDate}, {
            email: req.user.email, 
            date: curDate, 
            exerciseType : parseInt(exerciseSum), 
            intensity: intensity}, {upsert: true}, function (err, docs) {
                if (err) {
                    console.log(err)
                } else {
                    res.redirect('/');
                }
        } )
    } else {
        req.redirect('/login')
    }
})

router.get('/',(req,res)=>{
    if (req.isAuthenticated()) {
        Workout.find({ email: req.user.email}, function (err, docs) {
            if (err) {
                console.log(err)
            } else {
                res.render('main-auth', {
                    title: "MuscleBuddy",
                    user: req.user,
                    workouts: docs
                })
            }
        });
    } else {
        res.redirect('/');
    }
})

module.exports  = router;