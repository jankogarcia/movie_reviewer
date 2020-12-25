const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);
const app = express();

const { User } = require('./models/user');
const { Movie } = require('./models/movie');

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE, {useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify: false});

app.use(bodyParser.json());
app.use(cookieParser());

const postMovie = (req, res) => {
    let movie = new Movie({
        name: req.body.name,
        director: req.body.director,
        review: req.body.review,
        rating: req.body.rating,
        reviewerId: req.body.user,
        actors: req.body.actors,
        year: req.body.year
    });

    movie.save((err, movie) => {
        if(err){
            console.log(err)
            return res.status(400).json({error:err.message})
        }

        return res.status(201).json({
            post:true,
            movieId:movie._id
        })
    })
}

const getMoviesByUser = (req,res) => {
    Movie.find({reviewerId:req.params.id}, (err, movies) => {
        if(err){
            console.log(err);
            return res.status(400).json({error:err.message})
        }

        if(movies.length == 0){
            return res.status(200).json({message:'no movies found.'})
        }

        return res.status(200).send(movies)
    })
}

const getMovieById = (req, res) => {
    Movie.findById(req.params.id, (err, movie) => {
        if(err){
            console.log(err);
            return res.status(400).json({error:err.message})
        }

        if(!movie){
            return res.status(200).json({message:'no movie found.'})
        }

        return res.status(200).send(movie)
    })
}

const getMovies = (req, res) => {
    ///api/movies?skip=3&limit=2&order=asc
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;

    Movie.find()
    .skip(skip)
    .sort({_id:order})
    .limit(limit)
    .exec((err, docs) => {
        if(err){
            console.log(err);
            return res.status(400).json({error:err.message})
        }

        return res.status(200).send(docs)
    })
}

app.post('/api/movie', postMovie)
app.get('/api/user/:id/movies', getMoviesByUser)
app.get('/api/movie/:id', getMovieById)
app.get('/api/movies', getMovies)


app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
})