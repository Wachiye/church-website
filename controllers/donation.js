const db = require("../models");
const Op = db.Sequelize.Op;
const Donation = db.Donation;

// creating and save a new Donation
exports.create = (req, res) => {
    //validation
    if(!req.body){
        res.status(400).json( {
            message : "Error: Empty fields."
        });
        return;
    }
    if(!req.body.type){
        res.status(400).json( {
            message : "Error: Donation type(offering/tithing/donation) is required"
        });
        return;
	}
    if(!req.body.transaction_id){
        res.status(400).json( {
            message : "Error: Donation transaction_id is required"
        });
        return;
	}
	if(!req.body.user_id){
        res.status(400).json( {
            message : "Error: User_id is required"
        });
        return;
	}
	if(!req.body.amount){
        res.status(400).json( {
            message : "Error: Donation amount is required"
        });
        return;
    }
    //create Donation
    const donation = {
        type: req.body.type,
		transaction_id: req.body.transaction_id,
		purpose: req.body.purpose || req.body.type,
		user_id: req.body.user_id, //current session user_id
        amount: req.body.amount || 0.00 
    }

    //save Donation
    Donation.create(donation)
        .then(data=>{
            res.json(data);
        })
        .catch(err => {
            res.status(400).json( {
                message : err.message || "Some error occurred while creating Donation"
            });
        });
};

//find a single Donation with an id
exports.findOne = (req, res) => {
    const id = req.params.id
    Donation.findByPk(id)
    .then( data => {
        if(!data){
            res.json({
                message:"No Donation found"
            });
            return;
        }
        res.json(data);
    })
    .catch(err => {
        res.status(500).json({
            message: err.message || `Some error occurred while fetching Donation width id: ${id}`
        });
    });
};

// retrieve all Donations from the database
exports.findAll = (req, res) => {
    Donation.findAll({ where: req.query || null})
        .then( data => {
            if(!data){
                res.json({
                    message:"No Donations found"
                });
                return;
            }
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || "Some error occurred while fetching Donations"
            });
        });

};

//update a Donation by the id
exports.update = (req, res) => {
    const id = req.params.id;

    Donation.update(req.body, {
        where:{ id: id}
    })
    .then( num => {
        if(num == 1){
            res.json({
                message: "Donation was updated successfully"
            });
        }
        else{
            res.json({
                message: `Cannot update Donation with id = ${id}. Donation not found/ Empty data supplied`
            });
        }
    })
    .catch( err => {
        res.status(500).json({
            message: err.message || `Error updating Donation with id = $(id)`
        });
    });
};

//delete a Donation with the specified id
exports.delete = (req, res) => {
    const id = req.params.id;

    Donation.destroy({
        where:{ id: id}
    })
    .then( num => {
        if(num == 1){
            res.json({
                message: "Donation was deleted successfully"
            });
        }
        else{
            res.json({
                message: `Cannot delete Donation with id = ${id}. Donation not found!`
            });
        }
    })
    .catch( err => {
        res.status(500).json({
            message: err.message || `Error deleting Donation with id = $(id)`
        });
    });
};

//delete all Donations from the database
exports.deleteAll = (req, res) => {
    Donation.destroy({
        where:{ }, truncate: false
    })
    .then( nums => {
        res.json({
            message: `${nums} Donations were deleted successfully`
        });
        
    })
    .catch( err => {
        res.status(500).json({
            message: err.message || `Error deleting  all Donations`
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
            created: from_date_range
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