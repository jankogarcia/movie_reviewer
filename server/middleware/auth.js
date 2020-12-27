const { User } = require('./../models/user')

let auth = (req, res, next) => {
    let token = req.cookies.auth;
    User.findByToken(token, (err, user) => {
        if(err){
            return res.status(400).json({message:err.message});
        }

        if(!user){
            return res.status(200).send({error:true,message:'not authorized.'})
        }
        
        req.token = token;
        req.user = user;
        next();
    })
}

module.exports = { auth }