const db = require("../models");
const Ministry = db.Ministry;

const cloudinary = require("../utils/cloudinary");
const responseHandler = require("../utils/responseHandler");

// creating and save a new Ministry
exports.create = async (req, res) => {
  //validation
  if (!req.body) {
    return responseHandler.sendFailure(res, {
      code: 400,
      name: "missing_field",
      message: "name/description/file missing",
    });
  }
  if (!req.body.name) {
    return responseHandler.sendFailure(res, {
      code: 400,
      name: "missing_field",
      message: "name missing",
    });
  }
  if (!req.body.description) {
    return responseHandler.sendFailure(res, {
      code: 400,
      name: "missing_field",
      message: "description missing",
    });
  }
  //instantiate a Ministry object
  var ministry = {
    name: req.body.name,
    description: req.body.description,
  };

  let uploadedImage;
  if (req.file) {
    uploadedImage = await cloudinary.uploader.upload(req.file.path);
    ministry.image = uploadedImage.secure_url;
  }
  //save
  Ministry.create(ministry)
    .then((data) => {
      return responseHandler.sendSuccess(res, {
        data,
        message: "ministry added successfully",
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

//find a single Ministry with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Ministry.findOne({
    where: {
      id: id,
    },
  })
    .then((data) => {
      if (!data) {
        return responseHandler.sendFailure(res, {
          code: 400,
          name: "no_such_ministry",
          message: `no ministry exists with  given id: ${id}`,
        });
      } else {
        return responseHandler.sendSuccess(res, data);
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

// retrieve all ministries from the database
exports.findAll = (req, res) => {
  Ministry.findAll({
    where: req.query || null,
  })
    .then((data) => {
      if (!data || (data && data.length === 0)) {
        return responseHandler.sendFailure(res, {
          code: 400,
          name: "empty_data_set",
          message: "no ministry records were found",
        });
      } else {
        return responseHandler.sendSuccess(res, data);
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

//update a Ministry by the id
exports.update = async (req, res) => {
  const id = req.params.id;
  let uploadedImage;
  if (req.file) {
    uploadedImage = await cloudinary.uploader.upload(req.file.path);
    req.body.image = uploadedImage.secure_url;
  }
  Ministry.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        return responseHandler.sendSuccess(res, {
          message: "ministry was updated successfully",
        });
      } else {
        return responseHandler.sendFailure(res, {
          code: 400,
          name: "no_such_ministry",
          message: `Cannot update ministry with id = ${id}. ministry not found/ Empty data supplied`,
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

//delete a Ministry with the specified id
exports.delete = (req, res) => {
  const id = req.params.id;

  Ministry.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        return responseHandler.sendSuccess(
          res,
          {
            message: "ministry was deleted successfully",
          },
          204
        );
      } else {
        return responseHandler.sendFailure(res, {
          code: 400,
          name: "no_such_ministry",
          message: `Cannot delete ministry with id = ${id}. ministry not found/ Empty data supplied`,
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

//delete all ministries from the database
exports.deleteAll = (req, res) => {
  Ministry.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      if (nums == 1) {
        return responseHandler.sendSuccess(
          res,
          {
            message: `${nums} ministries were deleted successfully`,
          },
          204
        );
      } else {
        return responseHandler.sendFailure(res, {
          code: 400,
          name: "empty_data_set",
          message: "no ministry records were found",
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
