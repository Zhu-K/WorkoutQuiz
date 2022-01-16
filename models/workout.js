const mongoose = require('mongoose');
const WorkoutSchema  = new mongoose.Schema({
  email :{
    type  : String,
    required : true
    } ,
    exerciseType :{
        type  : Number,
        required : true
    } ,
    intensity :{
        type  : Number,
        required : true
    } ,
    date :{
        type : Date,
        required : true
    }
});
WorkoutSchema.index({ email: 1, date: -1}, { unique: true });

const Workout= mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;