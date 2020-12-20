require('dotenv').config();
const jwt = require("jwt-simple");
const db = require("../models");
const Login = db.Login;

exports.verify = (req, res, next) => {
   try {
       const authorization = req.header('Authorization');
       
       if(!authorization){
           res.status(401).json({
               message: "Error: Access Denied. You are not authorized to do this action.Please login"
           });
           return;
       }

        const token = authorization;
        const data = jwt.decode( token, process.env.JWT_SECRET,  false,"HS512");

        Login.findOne({
            where: {
                user_id: data.id
            }
        })
        .then(user => {
            if(!user){
                res.status(401).json({
                    message: "Error: Access Denied. You are not authorized to do this action.Please Login"
                });
                return;
            }
            req.user_id = data.id;
            req.username = data.username;
            req.isAdmin = data.isAdmin;
            next();
        })
        .catch( err => {
            console.log(err)
            res.status(500).json({
                message: "Error: Access Denied. Could not verify user credentials. Try again later"
            });
        });
   } catch (error) { 
       console.log(error);
       res.status(500).json({
          
           message: `${JSON.stringify(error)}`
       });
   }
}