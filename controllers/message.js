const db = require("../models");
const Message = db.Message;

// creating and save a new Message
exports.create = (req, res) => {
    //validation
    if(!req.body){
        res.status(400).json({
           message: "Error: Empty  fields"
        });
        return;
    }
    if(!req.body.name){
        res.status(400).json({
           message: "Error: name is required."
        });
        return;
    }
    if(!req.body.email){
        res.status(400).json({
           message: "Error: Email is required."
        });
        return;
    }
    if(!req.body.phone){
        res.status(400).json({
           message: "Error: Phone No is required."
        });
        return;
    }
    if(!req.body.message){
        res.status(400).json({
           message: "Error:Message is required"
        });
        return;
    }

    //instantiate a Message object
    var message = {
        name: req.body.name,
        email: req.body.email,
        phone : req.body.phone,
        message: req.body.message
    }

    //save
    Message.create(message)
        .then(data => {
            res.json({
                message : "Message details added successfully"
            });
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || "Some error occurred while adding Message details"
            });
        });
};

//find a single Message with an id
exports.findOne = (req, res) => {
    const id = req.params.id
    Message.findOne({
        where: {
            id: id
        }
    })
    .then( data => {
        if(!data){
            res.json({
                message:"No Message found"
            });
            return;
        }
        res.json(data);
    })
    .catch(err => {
        res.status(500).json({
            message: err.message || `Some error occurred while fetching Message width id: ${id}`
        });
    });
};

// retrieve all Messages from the database
exports.findAll = (req, res) => {
    Message.findAll({
        where: req.query || null
    })
        .then( data => {
            if(!data){
                res.json({
                    message:"No Messages found"
                });
                return;
            }
            console.log(data.length)
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || "Some error occurred while fetching Messages"
            });
        });

};

//update a Message by the id
exports.update = (req, res) => {
    const id = req.params.id;

    Message.update(req.body, {
        where:{ id: id}
    })
    .then( num => {
        if(num == 1){
            res.json({
                message: "Message was updated successfully"
            });
        }
        else{
            res.json({
                message: `Cannot update Message with id = ${id}. Message not found/ Empty data supplied`
            });
        }
    })
    .catch( err => {
        res.status(500).json({
            message: err.message || `Error updating Message with id = $(id)`
        });
    });
};

//delete a Message with the specified id
exports.delete = (req, res) => {
    const id = req.params.id;

    Message.destroy({
        where:{ id: id}
    })
    .then( num => {
        if(num == 1){
            res.json({
                message: "Message was deleted successfully"
            });
        }
        else{
            res.json({
                message: `Cannot delete Message with id = ${id}. Message not found!`
            });
        }
    })
    .catch( err => {
        res.status(500).json({
            message: err.message || `Error deleting Message with id = $(id)`
        });
    });
};

//delete all Messages from the database
exports.deleteAll = (req, res) => {
    Message.destroy({
        where:{ }, truncate: false
    })
    .then( nums => {
        res.json({
            message: `${nums} Messages were deleted successfully`
        });
        
    })
    .catch( err => {
        res.status(500).json({
            message: err.message || `Error deleting  all Messages`
        });
    });
};
