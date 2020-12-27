const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);
const app = express();

const { User } = require('./models/user');
const { Movie } = require('./models/movie');
const { auth } = require('./middleware/auth');

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

const updateMovie = (req, res) => {
    Movie.findByIdAndUpdate(req.body._id, req.body, {new:true}, (err, doc) => {
        if(err){
            console.log(err)
            return res.status(400).json({error:err.message})
        }

        return res.status(200).json({
            success:true,
            doc
        })
    })
}

const deleteMovieById = (req, res) => {
    Movie.findByIdAndRemove(req.params.id, (err, resp) => {
        if(err){
            console.log(err);
            return res.status(400).json({error:err.message})
        }

        return res.status(200).json({
            success:true
        })
    })
}

const registerUser = (req, res) => {
    let user = new User(req.body);
    user.save((err, user) => {
        if(err){
            console.log(err);
            return res.status(400).json({success:false,error: err.message})
        }

        return res.status(201).json({sucess:true, user})
    })
}

const login = (req, res) => {
    User.findOne({email:req.body.email}, (err, user) => {
        if(err){
            console.log(err)
            return res.status(400).json({error:err.message})
        }

        if(!user){
            return res.json({isAuth:false, message:"Auth failed. not matching email."})
        }

        user.comparePassword(req.body.password, (err, isMatch) => {
            if(err){
                console.log(err);
                return res.status(400).json({message:err.message})
            }

            if(!isMatch){
                return res.status(400).json({isAuth:false, message:'Wrong password.'})
            }

            user.generateToken((err, doc) => {
                if(err){
                    console.log(err);
                    return res.status(400).json({message:err.message})
                }

                return res.cookie('auth', doc.token).json({
                    isAuth:true, 
                    id:doc._id, 
                    email:doc.email
                })
            })
        })
    })
}

const getUserById = (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if(err){
            console.log(err)
            return res.status(400).json({message:err.message})
        }

        if(!user){
            return res.status(200).json({message:'no user found.'})
        }

        return res.status(200).json({
            name:user.name,
            lastname:user.lastname
        })
    });
}

const getAllUsers = (req, res) => {
    User.find({}, (err, users) => {
        if(err){
            console.log(err)
            return res.status(400).json({message:err.message})
        }

        return res.status(200).send(users)
    })
}

const logout = (req, res) => {
    req.user.deleteToken((err, user) => {
        if(err){
            console.log(err)
            return res.status(400).json({message:err.message})
        }
        return res.status(200).send();
    });
}

const isAuth = (req, res) => {
    return res.json({
        isAuth:true,
        id:req.user._id,
        email:req.user.email,
        name:req.user.name,
        lastname:req.user.lastname
    })
}

app.post('/api/movie', postMovie)
app.post('/api/movie_update', updateMovie)
app.get('/api/user/:id/movies', getMoviesByUser)
app.get('/api/movie/:id', getMovieById)
app.get('/api/movies', getMovies)
app.delete('/api/movie/:id', deleteMovieById)

app.post('/api/user', registerUser)
app.post('/api/login', login)
app.get('/api/logout', auth, logout)
app.get('/api/user/isauth', auth, isAuth)
app.get('/api/user/:id', getUserById)
app.get('/api/users', getAllUsers)

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
})