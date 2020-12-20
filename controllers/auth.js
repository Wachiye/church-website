require('dotenv').config();
const jwt = require("jwt-simple");
const db = require("../models");
const Login = db.Login;
const User = db.User;
const bcrypt = require("bcrypt");
const responseHandler = require('../utils/responseHandler');

exports.login = async(req, res, next) => {
    if(!req.body){
        return responseHandler.sendFailure(res,{
           code: 400,
           name: "missing_field",
           message: "username/password missing"
       });
    }
    if(!req.body.username || !req.body.password){
        return responseHandler.sendFailure(res,{
            code: 400,
            name: "missing_field",
            message: "username/password missing"
        });
    }
    let {username, password} = req.body;

    User.findOne({
        where :{
            username:  username
        }
    })
    .then( async user => {
        if(!user || (user  && user.length == 0)){
            let err = {
                code: 500,
                name: "no_such_user",
                message: `No user exits with given username: ${username}`
            }
            return responseHandler.sendFailure(res,err)
        }
        
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if(!isPasswordMatch){
            let err = {
                code: 500,
                name: "PASSWORD_ERR",
                message: "Passwords don't match"
            }
            return responseHandler.sendFailure(res,err)
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

        const data = {
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
            id: user.id,
            token
        }
        return responseHandler.sendSuccess(res,data);

    })
    .catch(err => {
        return responseHandler.sendFailure(res,{
            code: 500,
            name: "database_err",
            message: err.message || null
        });
    });

};

exports.logout = (req, res, next) => {
    console.log(req.user_id)
    Login.destroy({
        where:{user_id: req.user_id }, truncate: false
    })
    .then( nums => {
        if(nums === 1)
            return responseHandler.sendSuccess(res,{
                message:'logout out'
            },204);
        else
            return responseHandler.sendFailure(res,{
                code: 500,
                name: 'no_such_user',
                message:'Could not logout user with given id. user not found'
            })
    })
    .catch( err => {
        return responseHandler.sendFailure(res,{
            code: 500,
            name: 'database_err',
            message: err.message || "Unable to logout of the system"
        })
    });
   
};

exports.changePassword = async (req, res) => {
    const id = req.body.user_id;
    User.findByPk(id)
    .then( async user => {
        if(!user){
            return responseHandler.sendFailure(res,{
                code: 500,
                name: "no_such_user",
                message: `No user exits with given username/id: ${id}`
            });
        }
        else{
            const current_password = req.body.current_password,
                new_password = req.body.new_password;

            const isPasswordMatch = await bcrypt.compare(current_password, user.password);

            if(!isPasswordMatch){
                return responseHandler.sendFailure(res,{
                    code: 500,
                    name: "PASSWORD_ERR",
                    message: "Passwords don't match"
                })
            }
            else{
              let password = await bcrypt.hashSync(new_password, 8);
                User.update({password:password}, {
                    where:{ id: id}
                })
                .then( num => {
                    if(num == 1){
                        return responseHandler.sendSuccess(res,{
                            message:"password changed successfully"
                        });
                    }
                    else{
                        return responseHandler.sendFailure(res,{
                           code: 500,
                            name: "no_such_user",
                            message: `cannot change password for user with id = ${id}. User not found or empty data received` 
                        })
                    }
                })
                .catch( err => {
                    return responseHandler.sendFailure(res,{
                        code: 500,
                        name: 'database_err',
                        message: err.message || "An error occurred while processing your request"
                    });
                });  
            }
        }
    })
    .catch(err => {
        console.log(err)
        err = {
            code: err.code || 500,
            name: err.name || 'database_err',
            message: err.message || null
        }
        return responseHandler.sendFailure(res,err)
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
