const db = require("../models");
const Sermon = db.Sermon;

// creating and save a new Sermon
exports.create = (req, res) => {
    //validation
    if(!req.body){
        res.status(400).json({
           message: "Error: Empty  fields"
        });
        return;
    }
    if(!req.body.title){
        res.status(400).json({
           message: "Error: Title is required."
        });
        return;
    }
    if(!req.body.description){
        res.status(400).json({
           message: "Error: Description(usually main bible verse text) is required."
        });
        return;
    }
    if(!req.body.content){
        res.status(400).json({
           message: "Error: Content is required"
        });
        return;
    }

    //instantiate a Sermon object
    var sermon = {
        title: req.body.title,
        description: req.body.description,
        verse: req.body.verse || null,
        content: req.body.content
    }

    //save
    Sermon.create(sermon)
        .then(data => {
            res.json({
                data: data,
                message : "Sermon details added successfully"
            });
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || "Some error occurred while adding Sermon details"
            });
        });
};

//find a single Sermon with an id
exports.findOne = (req, res) => {
    const id = req.params.id
    Sermon.findOne({
        where: {
            id: id
        }
    })
    .then( data => {
        if(!data){
            res.json({
                message:"No Sermon found"
            });
            return;
        }
        res.json(data);
    })
    .catch(err => {
        res.status(500).json({
            message: err.message || `Some error occurred while fetching Sermon width id: ${id}`
        });
    });
};

// retrieve all Sermons from the database
exports.findAll = (req, res) => {
    Sermon.findAll({
        where: req.query || null
    })
        .then( data => {
            if(!data){
                res.json({
                    message: "No Sermons found"
                });
                return;
            }
            console.log(data.length)
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({
                message:  err.message || "Some error occurred while fetching Sermons"
            });
        });

};

//update a Sermon by the id
exports.update = (req, res) => {
    const id = req.params.id;

    Sermon.update(req.body, {
        where:{ id: id}
    })
    .then( num => {
        if(num == 1){
            res.json({
                message: "Sermon was updated successfully"
            });
        }
        else{
            res.json({
                message:  `Cannot update Sermon with id = ${id}. Sermon not found/ Empty data supplied`
            });
        }
    })
    .catch( err => {
        res.status(500).json({
            message:  err.message || `Error updating Sermon with id = $(id)`
        });
    });
};

//delete a Sermon with the specified id
exports.delete = (req, res) => {
    const id = req.params.id;

    Sermon.destroy({
        where:{ id: id}
    })
    .then( num => {
        if(num == 1){
            res.json({
                message: "Sermon was deleted successfully"
            });
        }
        else{
            res.json({
                message:  `Cannot delete Sermon with id = ${id}. Sermon not found!`
            });
        }
    })
    .catch( err => {
        res.status(500).json({
            message:  err.message || `Error deleting Sermon with id = $(id)`
        });
    });
};

//delete all Sermons from the database
exports.deleteAll = (req, res) => {
    Sermon.destroy({
        where:{ }, truncate: false
    })
    .then( nums => {
        res.json({
            message:  `${nums} Sermons were deleted successfully`
        });
        
    })
    .catch( err => {
        res.status(500).json({
            message:  err.message || `Error deleting  all Sermons`
        });
    });
};
