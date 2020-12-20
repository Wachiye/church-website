const db = require("../models");
const Op = db.Sequelize.Op;
const Donation = db.Donation;
const responseHandler = require("../utils/responseHandler");
// creating and save a new Donation
exports.create = async (req, res) => {
  //validation
  if (!req.body) {
    return responseHandler.sendFailure(res, {
      code: 400,
      name: "missing_field",
      message:
        "type/purpose/user_id/name/phone/amount/transaction_id/check_out_id missing",
    });
  }
  if (!req.body.type) {
    return responseHandler.sendFailure(res, {
      code: 400,
      name: "missing_field",
      message: "type(offering/tithing/donation) missing",
    });
  }
  if (!req.body.transaction_id) {
    return responseHandler.sendFailure(res, {
      code: 400,
      name: "missing_field",
      message: "transaction_id missing",
    });
  }
  if (!req.body.user_id) {
    return responseHandler.sendFailure(res, {
      code: 400,
      name: "missing_field",
      message: "user_id missing",
    });
  }
  if (!req.body.name) {
    return responseHandler.sendFailure(res, {
      code: 400,
      name: "missing_field",
      message: "name missing",
    });
  }
  if (!req.body.phone) {
    return responseHandler.sendFailure(res, {
      code: 400,
      name: "missing_field",
      message: "phone missing",
    });
  }
  if (!req.body.amount) {
    return responseHandler.sendFailure(res, {
      code: 400,
      name: "missing_field",
      message: "amount missing",
    });
  }
  if (!req.body.check_out_id) {
    return responseHandler.sendFailure(res, {
      code: 400,
      name: "missing_field",
      message: "check_out_id missing",
    });
  }
  //create Donation
  const donation = {
    type: req.body.type,
    purpose: req.body.purpose || req.body.type,
    phone: req.body.phone,
    amount: req.body.amount || 0.0,
    transaction_id: req.body.transaction_id,
  };

  //save Donation
  Donation.create(donation)
    .then((data) => {
      return responseHandler.sendSuccess(res, {
        data,
        message: "donation received and saved. thank you.",
      });
    })
    .catch((err) => {
      return responseHandler.sendFailure(res, {
        code: 500,
        name: "database_err",
        message: err.message || null,
      });
    });
};

//find a single Donation with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Donation.findByPk({
    id: id,
    include: [
      {
        model: db.User,
        attributes: ["first_name", "last_name", "phone", "email"],
      },
    ],
  })
    .then((data) => {
      if (!data) {
        return responseHandler.sendFailure(res, {
          code: 500,
          name: "no_such_donation",
          message: `no donation exits with the given id: ${id}`,
        });
      }
      return responseHandler.sendSuccess(res, data);
    })
    .catch((err) => {
      return responseHandler.sendFailure(res, {
        code: 500,
        name: "database_err",
        message: err.message || null,
      });
    });
};

// retrieve all Donations from the database
exports.findAll = (req, res) => {
  Donation.findAll({
    where: req.query || null,
    include: [
      {
        model: db.User,
        attributes: ["first_name", "last_name", "phone", "email"],
      },
    ],
  })
    .then((data) => {
      if (!data) {
        return responseHandler.sendFailure(res, {
          code: 500,
          name: "empty_data_set",
          message: "no donation records were found",
        });
      }
      return responseHandler.sendSuccess(res, data);
    })
    .catch((err) => {
      return responseHandler.sendFailure(res, {
        code: 500,
        name: "database_err",
        message: err.message || null,
      });
    });
};

//update a Donation by the id
exports.update = (req, res) => {
  const id = req.params.id;

  Donation.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        return responseHandler.sendSuccess(
          res,
          {
            message: "donation updated successfully",
          },
          204
        );
      } else {
        return responseHandler.sendFailure(res, {
          code: 500,
          name: "database_err",
          message: `Cannot update Donation with id = ${id}. Donation not found/ Empty data supplied`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || `Error updating Donation with id = $(id)`,
      });
    });
};

//delete a Donation with the specified id
exports.delete = (req, res) => {
  const id = req.params.id;

  Donation.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        return responseHandler.sendSuccess(
          res,
          {
            message: "Donation was deleted successfully",
          },
          204
        );
      } else {
        return responseHandler.sendFailure(res, {
          code: 500,
          name: "no_such_donation",
          message: `Cannot delete Donation with id = ${id}. Donation not found!`,
        });
      }
    })
    .catch((err) => {
      return responseHandler.sendFailure(res, {
        code: 500,
        name: "database_err",
        message: err.message || null,
      });
    });
};

//delete all Donations from the database
exports.deleteAll = (req, res) => {
  Donation.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      if (nums > 0) {
        return responseHandler.sendSuccess(
          res,
          {
            message: `${nums} Donations were deleted successfully`,
          },
          204
        );
      } else {
        return responseHandler.sendFailure(res, {
          code: 500,
          name: "empty_data_set",
          message: "no donation records were found",
        });
      }
    })
    .catch((err) => {
      return responseHandler.sendFailure(res, {
        code: 500,
        name: "database_err",
        message: err.message || null,
      });
    });
};

//retrieve events added today
exports.findAllToday = (req, res) => {
  var from_date_range = {
    [Op.lt]: new Date(), //now
    [Op.gte]: new Date() - 24 * 60 * 60 * 1000, //24 hours ago
  };
  Donation.findAll({
    where: {
      created: from_date_range,
    },
  })
    .then((data) => {
      if (!data)
        return responseHandler.sendFailure(res, {
          code: 500,
          name: "empty_data_set",
          message: "no donations records were found",
        });
      return responseHandler.sendSuccess(res, data);
    })
    .catch((err) => {
      return responseHandler.sendFailure(res, {
        code: 500,
        name: "database_err",
        message: err.message || null,
      });
    });
};
