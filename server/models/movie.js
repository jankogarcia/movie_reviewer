const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    director:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    actors:[{
        name:String
    }],
    review:{
        type:String,
        default:'n/a'
    },
    rating:{
        type:Number,
        required:true,
        min:1,
        max:5
    },
    reviewerId:{
        type:String,
        required:true
    },
    minutes:{
        type:Number,
        required:true
    }
},{timestamps:true});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = {Movie};