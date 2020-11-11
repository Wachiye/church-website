require('dotenv').config();
const jwt = require("jwt-simple");
const db = require("../models");
const Login = db.Login;
const User = db.User;
const bycypt = require("bcrypt");

exports.login = async(req, res, next) => {
    if(!req.body){
        res.status(500).json({
            message: "Error: Invalid username/password."
        });
        return;
    }
    if(!req.body.username || !req.body.password){
        res.status(500).json({
            message: "Error: Invalid Username/password"
        });
        return;
    }
    let {username, password} = req.body;

    User.findOne({
        where :{
            username:  username
        }
    })
    .then( async user => {
        if(!user || (user  && user.length == 0)){
            res.status(500).json({
                message: `Error: No user exits with given username: ${username}`
            });
            return;
        }
        
        const isPasswordMatch = await bycypt.compare(password, user.password);

        if(!isPasswordMatch){
            res.status(404).json({
                message: "Error: Passwords don't match."
            });
            return;
        }
        const token = jwt.encode(
            {
                id: user.id,
                username: user.username,
                isAdmin: user.type == 'staff'
            },  process.env.JWT_SECRET,"HS512");

        const user_login = await Login.findOne({where:{
            user_id: user.id
        }});
        
        if(user_login){
            Login.update( {token},{ where: { user_id : user_login.id }});
        }
        else{
            Login.create({
                user_id: user.id,
                token: token
            })
        }

        const user_data = {
            first_name: user.first_name,
            last_name: user.last_name,
            phone: user.phone,
            email: user.email,
            address: user.address,
            dob: user.dob,
            age: user.age,
            gender: user.gender,
            username: user.username,
            role: user.role,
            type: user.type,
            image: user.image,
            token
        }
        return res.status(200).json({data: user_data});

    })
    .catch(err => {
        res.status(500).json({
            message: err.message || "Error: Some error occurred while authenticating"
        });
    });

};

exports.logout = (req, res, next) => {
    console.log(req.user_id)
    Login.destroy({
        where:{user_id: req.user_id }, truncate: false
    })
    .then( nums => {
        res.json({ 
            message: "Your are logout."
        });
        
    })
    .catch( err => {
        res.status(500).json({
            message: err.message || "Error: Unable to logout of the system. Try again later."
        });
    });
   
};

var generateAuthToken = (user) =>{
    const token = jwt.sign({
        id: user.id,
        username: user.username,
        isAdmin: user.role == 'staff'
    }, 
    process.env.JWT_SECRET, 
    {
        algorithm: "HS256", 
        expiresIn: 120
    });
    return token;
}