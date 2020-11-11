const db = require("../models");
const Op = db.Sequelize.Op;
const Event = db.Event;

// creating and save a new Event
exports.create = async (req, res) => {
    //validation
    if(!req.body){
        res.status(400).json( {
            message : "Error: Empty fields."
        });
        return;
    }
    if(!req.body.title){
        res.status(400).json( {
            message : "Error: Event title is required"
        });
        return;
	}
    if(!req.body.description){
        res.status(400).json( {
            message : "Error: Event description is required"
        });
        return;
	}
	if(!req.body.from){
        res.status(400).json( {
            message : "Error: Event starting date is required"
        });
        return;
	}
	if(!req.body.to){
        res.status(400).json( {
            message : "Error: Event end date is required"
        });
        return;
    }
    //create Event
    const event = {
        title: req.body.title,
		description: req.body.description,
		from: req.body.from,
		to: req.body.to,
        ministry_id: req.body.ministry_id || null
    }

    let uploadedImage;

    if(req.file){
        uploadedImage = await cloudinary.uploader.upload(req.file.path);
        event.image = uploadedImage.secure_url;
    }
    //save Event
    Event.create(event)
        .then(data=>{
            res.json(data);
        })
        .catch(err => {
            res.status(400).json( {
                message : err.message || "Some error occurred while creating Event"
            });
        });
};

//find a single Event with an id
exports.findOne = (req, res) => {
    const id = req.params.id
    Event.findByPk(id)
    .then( data => {
        if(!data){
            res.json({
                message:"No Event found"
            });
            return;
        }
        res.json(data);
    })
    .catch(err => {
        res.status(500).json({
            message: err.message || `Some error occurred while fetching Event width id: ${id}`
        });
    });
};

// retrieve all events from the database
exports.findAll = (req, res) => {
    Event.findAll({ where: req.query || null})
        .then( data => {
            if(!data){
                res.json({
                    message:"No events found"
                });
                return;
            }
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || "Some error occurred while fetching events"
            });
        });

};

//update a Event by the id
exports.update = async(req, res) => {
    const id = req.params.id;
    let uploadedImage;

    if(req.file){
        uploadedImage = await cloudinary.uploader.upload(req.file.path);
        req.body.image = uploadedImage.secure_url;
    }

    Event.update(req.body, {
        where:{ id: id}
    })
    .then( num => {
        if(num == 1){
            res.json({
                message: "Event was updated successfully"
            });
        }
        else{
            res.json({
                message: `Cannot update Event with id = ${id}. Event not found/ Empty data supplied`
            });
        }
    })
    .catch( err => {
        res.status(500).json({
            message: err.message || `Error updating Event with id = $(id)`
        });
    });
};

//delete a Event with the specified id
exports.delete = (req, res) => {
    const id = req.params.id;

    Event.destroy({
        where:{ id: id}
    })
    .then( num => {
        if(num == 1){
            res.json({
                message: "Event was deleted successfully"
            });
        }
        else{
            res.json({
                message: `Cannot delete Event with id = ${id}. Event not found!`
            });
        }
    })
    .catch( err => {
        res.status(500).json({
            message: err.message || `Error deleting Event with id = $(id)`
        });
    });
};

//delete all events from the database
exports.deleteAll = (req, res) => {
    Event.destroy({
        where:{ }, truncate: false
    })
    .then( nums => {
        res.json({
            message: `${nums} events were deleted successfully`
        });
        
    })
    .catch( err => {
        res.status(500).json({
            message: err.message || `Error deleting  all events`
        });
    });
};

//retrieve events added today
exports.findAllToday = (req, res) => {
    var from_date_range = { 
        [Op.lt]:  new Date(), //now
        [Op.gte]:  new Date() - 24 * 60 * 60 * 1000 //24 hours ago
    }
    Event.findAll( { 
        where: { 
            from: from_date_range
        }
    })
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while fetching events!"
        })
    });
};

//find all upcoming events
exports.findAllUpcoming = (req, res) => {
    Event.findAll( { 
        where: { 
            from: {
                [Op.gt]:  new Date()
            }
        }
    })
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while fetching events!"
        })
    });
};

//find all finished events
exports.findAllFinished = (req, res) => {
    Event.findAll( { 
        where: { 
            to:  {
                [Op.lt]:  new Date()
            }
        }
    })
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while fetching events!"
        })
    });
};
