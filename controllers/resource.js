const db = require("../models");
const Op = db.Sequelize.Op;
const Resource = db.Resource;
const cloudinary = require("../utils/cloudinary");
// creating and save a new Resource
exports.create = async(req, res) => {
    //validation
    if(!req.body){
        res.status(400).json({
           message: "Error: Empty  fields."
        });
        return;
    }
    if(!req.body.type){
        res.status(400).json({
           message: "Error: Resource type(Form/E-Book/Stroy) is required."
        });
        return;
    }
    if(!req.body.title){
        res.status(400).json({
           message: "Error:Resource Title is required"
        });
        return;
    }
    if(!req.body.description){
        res.status(400).json({
           message: "Error: Resource Description is required"
        });
        return;
    }
    if(req.body.type == 'ebook' || req.body.type == 'story'){
        if(!req.body.content){
            res.status(400).json({
            message: "Error: Resource content  for type(ebook/story) is required."
            });
            return;
        }
        req.body.content = req.body.description
    }
    if(!req.file){
        res.status(400).json({
           message: "Error: Resource thumbnail image(url) is required."
        });
        return;
    }
    if(req.body.type == 'form' && !req.body.url){
        res.status(400).json({
           message: "Error: Resource url for form type is required."
        });
        return;
    }
    //instantiate a Resource object
    var resource = {
        type : req.body.type,
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        url: req.body.url || null
    }
    //upload file to cloudinary
    let uploadedImage = await cloudinary.uploader.upload(req.file.path,
        {folder:"church-test", public_id: resource.title});
    //get the file url
    resource.image = uploadedImage.secure_url;

    //save
    Resource.create(resource)
        .then(data => {
            res.json({
                data: data,
                message : "Resource details added successfully"
            });
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || "Some error occurred while adding Resource details"
            });
        });
};

//find a single Resource with an id
exports.findOne = (req, res) => {
    const id = req.params.id
    Resource.findOne({
        id: id,
        include: [{
            model: db.User
        }]
    })
    .then( data => {
        if(!data){
            res.json({
                message:"No Resource found"
            });
            return;
        }
        res.json(data);
    })
    .catch(err => {
        res.status(500).json({
            message: err.message || `Some error occurred while fetching Resource width id: ${id}`
        });
    });
};

// retrieve all Resources from the database
exports.findAll = (req, res) => {
    Resource.findAll({
        include: [{
            model: db.User
        }]
    })
        .then( data => {
            if(!data){
                res.json({
                    message:"No Resources found"
                });
                return;
            }
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || "Some error occurred while fetching Resources"
            });
        });

};

//update a Resource by the id
exports.update = async(req, res) => {
    const id = req.params.id;
    let uploadedImage;

    if(req.file){
        uploadedImage = await cloudinary.uploader.upload(req.file.path,
            {folder:"church-test", public_id: req.body.title});
        req.body.image = uploadedImage.secure_url;
    }

    Resource.update(req.body, {
        where:{ id: id}
    })
    .then( num => {
        if(num == 1){
            res.json({
                message: "Resource was updated successfully"
            });
        }
        else{
            res.json({
                message: `Cannot update Resource with id = ${id}. Resource not found/ Empty data supplied`
            });
        }
    })
    .catch( err => {
        res.status(500).json({
            message: err.message || `Error updating Resource with id = $(id)`
        });
    });
};

//delete a Resource with the specified id
exports.delete = (req, res) => {
    const id = req.params.id;

    Resource.destroy({
        where:{ id: id}
    })
    .then( num => {
        if(num == 1){
            res.json({
                message: "Resource was deleted successfully"
            });
        }
        else{
            res.json({
                message: `Cannot delete Resource with id = ${id}. Resource not found!`
            });
        }
    })
    .catch( err => {
        res.status(500).json({
            message: err.message || `Error deleting Resource with id = $(id)`
        });
    });
};

//delete all Resources from the database
exports.deleteAll = (req, res) => {
    Resource.destroy({
        where:{ }, truncate: false
    })
    .then( nums => {
        res.json({
            message: `${nums} Resources were deleted successfully`
        });
        
    })
    .catch( err => {
        res.status(500).json({
            message: err.message || `Error deleting  all Resources`
        });
    });
};
