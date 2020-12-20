const db = require("../models");
const Op = db.Sequelize.Op;
const Church = db.Church;
const cloudinary = require("../utils/cloudinary");
const responseHandler = require("../utils/responseHandler");

// creating and save a new church
exports.create = async (req, res) => {
  //validation
  if (!req.body) {
    return responseHandler.sendFailure(res, {
      code: 400,
      name: "missing_field",
      message: "name/tag/email/phone/address/image missing",
    });
  }
  if (!req.body.name) {
    return responseHandler.sendFailure(res, {
      code: 400,
      name: "missing_field",
      message: "name missing",
    });
  }
  if (!req.body.tag) {
    return responseHandler.sendFailure(res, {
      code: 400,
      name: "missing_field",
      message: "tag missing",
    });
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
  if (!req.body.address) {
    return responseHandler.sendFailure(res, {
      code: 400,
      name: "missing_field",
      message: "church address is required",
    });
  }
  //instantiate a church object
  var church = {
    name: req.body.name,
    tag: req.body.tag,
    email: req.body.email || null,
    phone: req.body.phone || null,
    address: req.body.address,
  };

  let uploadedImage;

  if (req.file) {
    uploadedImage = await cloudinary.uploader.upload(req.file.path);
    church.image = uploadedImage.secure_url;
  }
  //save
  Church.create(church)
    .then((data) => {
      return responseHandler.sendSuccess(res, {
        data,
        message: "church details added successfully",
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

//find a single Church with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Church.findByPk(id)
    .then((data) => {
      if (!data) {
        return responseHandler.sendFailure(res, {
          code: 500,
          name: "no_such_church",
          message: `no church exits with the given id: ${id}`,
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

// retrieve all Churches from the database
exports.findAll = (req, res) => {
  Church.findAll()
    .then((data) => {
      if (!data)
        return responseHandler.sendFailure(res, {
          code: 500,
          name: "empty_data_set",
          message: "no church records were found",
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

//update a Church by the id
exports.update = async (req, res) => {
  const id = req.params.id;
  let uploadedImage;

  if (req.file) {
    uploadedImage = await cloudinary.uploader.upload(req.file.path);
    req.body.image = uploadedImage.secure_url;
  }
  Church.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        return responseHandler.sendSuccess(res, {
          message: " church details updated successfully",
        });
      } else {
        return responseHandler.sendFailure(res, {
          code: 500,
          name: "no_such_church",
          message: `Cannot update Church with id = ${id}. Church not found/ Empty data supplied`,
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

//delete a Church with the specified id
exports.delete = (req, res) => {
  const id = req.params.id;

  Church.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        return responseHandler.sendSuccess(
          res,
          {
            message: "church was deleted successfully",
          },
          204
        );
      } else {
        return responseHandler.sendFailure(res, {
          code: 500,
          name: "no_such_church",
          message: `Cannot delete Church with id = ${id}. Church not found!`,
        });
      }
    })
    .catch((err) => {
      return responseHandler.sendFailure(res, {
        code: 500,
        name: "database_err",
        message:
          err.message ||
          `Cannot delete Church with id = ${id}. Church not found!`,
      });
    });
};

//delete all Churches from the database
exports.deleteAll = (req, res) => {
  Church.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      if (nums > 0)
        return responseHandler.sendSuccess(
          res,
          {
            message: `${nums} Churches were deleted successfully`,
          },
          204
        );
      else
        return responseHandler.sendFailure(res, {
          code: 500,
          name: "empty_data_set",
          message: "no church records were found",
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
