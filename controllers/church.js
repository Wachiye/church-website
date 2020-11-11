const db = require("../models");
const Op = db.Sequelize.Op;
const Church = db.Church;
const cloudinary = require("../utils/cloudinary");
// creating and save a new church
exports.create =  async(req, res) => {
    //validation
    if(!req.body){
        res.status(400).json({
           message: "Error: Empty  fields. Name/tag/email/phone are missing"
        });
        return;
    }
    if(!req.body.name){
        res.status(400).json({
           message: "Error: Church name is required."
        });
        return;
    }
    if(!req.body.tag){
        res.status(400).json({
           message: "Error:Church tag line is required"
        });
        return;
    }
    // if(!req.body.email){
    //     res.status(400).json({
    //        message: "Error: Church email is required"
    //     });
    //     return;
    // }
    // if(!req.body.phone){
    //     res.status(400).json({
    //        message: "Error: Church phone number is required."
    //     });
    //     return;
    // }
    // if(!req.body.image){
    //     res.status(400).json({
    //        message: "Error: Church image is required."
    //     });
    //     return;
    // }
    if(!req.body.address){
        res.status(400).json({
           message: "Error: Church address is required."
        });
        return;
    }
    //instantiate a church object
    var church = {
        name : req.body.name,
        tag: req.body.tag,
        email: req.body.email || null,
        phone: req.body.phone || null,
        address: req.body.address
    }

    let uploadedImage;

    if(req.file){
        uploadedImage = await cloudinary.uploader.upload(req.file.path);
        church.image = uploadedImage.secure_url;
    }
    //save
    Church.create(church)
        .then(data => {
            res.json({
                message : "Church details added successfully"
            });
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || "Some error occurred while adding church details"
            });
        });
};

//find a single Church with an id
exports.findOne = (req, res) => {
    const id = req.params.id
    Church.findByPk(id)
    .then( data => {
        if(!data){
            res.json({
                message:"No Church found"
            });
            return;
        }
        res.json(data);
    })
    .catch(err => {
        res.status(500).json({
            message: err.message || `Some error occurred while fetching Church width id: ${id}`
        });
    });
};

// retrieve all Churches from the database
exports.findAll = (req, res) => {
    Church.findAll()
        .then( data => {
            if(!data){
                res.json({
                    message:"No Churches found"
                });
                return;
            }
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || "Some error occurred while fetching Churches"
            });
        });

};

//update a Church by the id
exports.update = async(req, res) => {
    const id = req.params.id;
    let uploadedImage;

    if(req.file){
        uploadedImage = await cloudinary.uploader.upload(req.file.path);
        req.body.image = uploadedImage.secure_url;
    }
    Church.update(req.body, {
        where:{ id: id}
    })
    .then( num => {
        if(num == 1){
            res.json({
                message: "Church was updated successfully"
            });
        }
        else{
            res.json({
                message: `Cannot update Church with id = ${id}. Church not found/ Empty data supplied`
            });
        }
    })
    .catch( err => {
        res.status(500).json({
            message: err.message || `Error updating Church with id = $(id)`
        });
    });
};

//delete a Church with the specified id
exports.delete = (req, res) => {
    const id = req.params.id;

    Church.destroy({
        where:{ id: id}
    })
    .then( num => {
        if(num == 1){
            res.json({
                message: "Church was deleted successfully"
            });
        }
        else{
            res.json({
                message: `Cannot delete Church with id = ${id}. Church not found!`
            });
        }
    })
    .catch( err => {
        res.status(500).json({
            message: err.message || `Error deleting Church with id = $(id)`
        });
    });
};

//delete all Churches from the database
exports.deleteAll = (req, res) => {
    Church.destroy({
        where:{ }, truncate: false
    })
    .then( nums => {
        res.json({
            message: `${nums} Churches were deleted successfully`
        });
        
    })
    .catch( err => {
        res.status(500).json({
            message: err.message || `Error deleting  all Churches`
        });
    });
};
