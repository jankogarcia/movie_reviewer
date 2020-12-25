const config = {
    production:{
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI,
        PORT: process.env.PORT
    },
    default:{
        SECRET: 'supersecretpassword123',
        DATABASE: 'mongodb://localhost:27017/movies_reviewer',
        PORT: 3001
    }
}

exports.get = function get(env){
    return config[env] || config.default
}