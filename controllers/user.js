const db = require("../models");
const Op = db.Sequelize.Op;
const User = db.User;
var date = new Date();
const uploaderController = require("./uploader");
const cloudinary = require("../utils/cloudinary");
const bcrypt = require("bcrypt");
// creating and save a new user
exports.create = async (req, res) => {
    //validation
    if(!req.body){
        res.status(400).json( {
            message : "Error: Empty fields"
        });
        return;
    }
    if(!req.body.first_name){
        res.status(400).json( {
            message : "Error: First name is required"
        });
        return;
    }
    if(!req.body.last_name){
        res.status(400).json( {
            message : "Error: Last name is required"
        }); 
        return;
    }
    if(!req.body.username){
        res.status(400).json( {
            message : "Error: Username is required"
        }); 
        return;
    }
    if(!req.body.dob){
        res.status(400).json( {
            message : "Error: DOB(date of birth) is required"
        }); 
        return;
    }
    if(!req.body.gender){
        res.status(400).json( {
            message : "Error: Gender must be specified"
        });
        return
    }
    if(!req.body.password){
        res.status(400).json( {
            message : "Error: Password is required"
        }); 
        return;
    }

    //create user
    const user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        dob: date.getDate(req.body.dob),
        email: req.body.email || null,
        phone: req.body.phone || null,
        gender: req.body.gender,
        type: req.body.type || null,
        password: bcrypt.hashSync(req.body.password, 8)
    }

    //upload file to cloudinary
    let uploadedImage = await cloudinary.uploader.upload(req.file.path,
        {folder:"church-test", public_id: user.username});
    //get the file url
    user.image = req.file ? uploadedImage.secure_url : null;
    
    //save user
    User.create(user)
        .then( async data =>{
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json( {
                message : err.message || "Some error occurred while creating user"
            });
        });
};

//find a single user with an id
exports.findOne = (req, res) => {
    const id = req.params.id
    User.findByPk(id)
    .then( data => {
        if(!data){
            res.json({
                message:"No user found"
            });
            return;
        }
        res.json(data);
    })
    .catch(err => {
        res.status(500).json({
            message: err.message || `Some error occurred while fetching user width id: ${id}`
        });
    });
};

// retrieve all users from the database
exports.findAll = (req, res) => {
    User.findAll({ where: req.query || null})
        .then( data => {
            if(!data){
                res.json({
                    message:"No users found"
                });
                return;
            }
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || "Some error occurred while fetching users"
            });
        });

};

//update a user by the id
exports.update = async (req, res) => {
    const id = req.params.id;
    let uploadedImage;
    if(req.file){
        uploadedImage = await cloudinary.uploader.upload(req.file.path,
            {folder:"church-test", public_id: req.body.username});
        req.body.image = uploadedImage.secure_url;
    }
    User.update(req.body, {
        where:{ id: id}
    })
    .then( num => {
        if(num == 1){
            res.json({
                message: "User was updated successfully"
            });
        }
        else{
            res.json({
                message: `Cannot update User with id = ${id}. User not found/ Empty data supplied`
            });
        }
    })
    .catch( err => {
        res.status(500).json({
            message: err.message || `Error updating User with id = $(id)`
        });
    });
};

//delete a user with the specified id
exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where:{ id: id}
    })
    .then( num => {
        if(num == 1){
            res.json({
                message: "User was deleted successfully"
            });
        }
        else{
            res.json({
                message: `Cannot delete User with id = ${id}. User not found!`
            });
        }
    })
    .catch( err => {
        res.status(500).json({
            message: err.message || `Error deleting User with id = $(id)`
        });
    });
};

//delete all users from the database
exports.deleteAll = (req, res) => {
    User.destroy({
        where:{ }, truncate: false
    })
    .then( nums => {
        res.json({
            message: `${nums} users were deleted successfully`
        });
        
    })
    .catch( err => {
        res.status(500).json({
            message: err.message || `Error deleting  all users`
        });
    });
};

//retrieve users added today
exports.findAllToday = (req, res) => {
    User.findAll( { 
        where: { 
            created_at: {
                [Op.lt]:  new Date(), 
                [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000)
            }
        }
    })
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while fetching users!"
        })
    });
};
