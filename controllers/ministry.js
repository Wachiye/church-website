const db = require("../models");
const Ministry = db.Ministry;

// creating and save a new Ministry
exports.create = (req, res) => {
    //validation
    if(!req.body){
        res.status(400).json({
           message: "Error: Empty  fields."
        });
        return;
    }
    if(!req.body.name){
        res.status(400).json({
           message: "Error: Ministry name is required."
        });
        return;
    }
    if(!req.body.description){
        res.status(400).json({
           message: "Error: Ministry Description is required"
        });
        return;
    }
    //instantiate a Ministry object
    var ministry = {
        name : req.body.name,
        description: req.body.description,
        image: req.body.image || null
    }

    //save
    Ministry.create(ministry)
        .then(data => {
            res.json({
                message : "Ministry details added successfully"
            });
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || "Some error occurred while adding Ministry details"
            });
        });
};

//find a single Ministry with an id
exports.findOne = (req, res) => {
    const id = req.params.id
    Ministry.findOne({
        where: {
            id: id
        }
    })
    .then( data => {
        if(!data){
            res.json({
                message:"No Ministry found"
            });
            return;
        }
        res.json(data);
    })
    .catch(err => {
        res.status(500).json({
            message: err.message || `Some error occurred while fetching Ministry width id: ${id}`
        });
    });
};

// retrieve all ministries from the database
exports.findAll = (req, res) => {
    Ministry.findAll({
        where: req.query || null
    })
        .then( data => {
            if(!data){
                res.json({
                    message:"No ministries found"
                });
                return;
            }
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || "Some error occurred while fetching ministries"
            });
        });

};

//update a Ministry by the id
exports.update = (req, res) => {
    const id = req.params.id;

    Ministry.update(req.body, {
        where:{ id: id}
    })
    .then( num => {
        if(num == 1){
            res.json({
                message: "Ministry was updated successfully"
            });
        }
        else{
            res.json({
                message: `Cannot update Ministry with id = ${id}. Ministry not found/ Empty data supplied`
            });
        }
    })
    .catch( err => {
        res.status(500).json({
            message: err.message || `Error updating Ministry with id = $(id)`
        });
    });
};

//delete a Ministry with the specified id
exports.delete = (req, res) => {
    const id = req.params.id;

    Ministry.destroy({
        where:{ id: id}
    })
    .then( num => {
        if(num == 1){
            res.json({
                message: "Ministry was deleted successfully"
            });
        }
        else{
            res.json({
                message: `Cannot delete Ministry with id = ${id}. Ministry not found!`
            });
        }
    })
    .catch( err => {
        res.status(500).json({
            message: err.message || `Error deleting Ministry with id = $(id)`
        });
    });
};

//delete all ministries from the database
exports.deleteAll = (req, res) => {
    Ministry.destroy({
        where:{ }, truncate: false
    })
    .then( nums => {
        res.json({
            message: `${nums} ministries were deleted successfully`
        });
        
    })
    .catch( err => {
        res.status(500).json({
            message: err.message || `Error deleting  all ministries`
        });
    });
};
