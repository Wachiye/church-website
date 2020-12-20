const db = require("../models");
const Op = db.Sequelize.Op;
const User = db.User;
var date = new Date();
const cloudinary = require("../utils/cloudinary");
const responseHandler = require("../utils/responseHandler");
const bcrypt = require("bcrypt");
// creating and save a new user
exports.create = async (req, res) => {
  //validation
  if (!req.body) {
    return responseHandler.sendFailure(res, {
      code: 400,
      name: "missing_field",
      message:
        "first_name/last_name/dob/age/address/email/phone/type/role/ missing",
    });
  }
  if (!req.body.first_name) {
    return responseHandler.sendFailure(res, {
      code: 400,
      name: "missing_field",
      message: "first_name missing",
    });
  }
  if (!req.body.last_name) {
    return responseHandler.sendFailure(res, {
      code: 400,
      name: "missing_field",
      message: "last_name missing",
    });
  }
  if (!req.body.username) {
    return responseHandler.sendFailure(res, {
      code: 400,
      name: "missing_field",
      message: "username missing",
    });
  }
  if (!req.body.dob) {
    return responseHandler.sendFailure(res, {
      code: 400,
      name: "missing_field",
      message: "dob missing",
    });
  }
  if (!req.body.gender) {
    return responseHandler.sendFailure(res, {
      code: 400,
      name: "missing_field",
      message: "gender missing",
    });
  }
  if (!req.body.password) {
    return responseHandler.sendFailure(res, {
      code: 400,
      name: "missing_field",
      message: "password missing",
    });
  }

  //create user
  const user = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    dob: date.getDate(req.body.dob),
    email: req.body.email || null,
    phone: req.body.phone || null,
    gender: req.body.gender,
    type: req.body.type || null,
    password: bcrypt.hashSync(req.body.password, 8),
  };

  if (req.file) {
    //upload file to cloudinary
    let uploadedImage = await cloudinary.uploader.upload(req.file.path, {
      folder: "church-test",
      public_id: user.username,
    });
    //get the file url
    user.image = req.file ? uploadedImage.secure_url : null;
  }
  //save user
  User.create(user)
    .then(async (data) => {
      return responseHandler.sendSuccess(res, {
        data,
        message: "sermon added successfully",
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

//find a single user with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  User.findByPk(id)
    .then((data) => {
      if (!data) {
        return responseHandler.sendFailure(res, {
          code: 400,
          name: "no_such_user",
          message: `o user exists with given id: ${id}`,
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

// retrieve all users from the database
exports.findAll = (req, res) => {
  User.findAll({ where: req.query || null })
    .then((data) => {
      if (!data) {
        return responseHandler.sendFailure(res, {
          code: 400,
          name: "empty_data_set",
          message: "no user records were found",
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

//update a user by the id
exports.update = async (req, res) => {
  const id = req.params.id;
  let uploadedImage;
  if (req.file) {
    uploadedImage = await cloudinary.uploader.upload(req.file.path, {
      folder: "church-test",
      public_id: req.body.username,
    });
    req.body.image = uploadedImage.secure_url;
  }
  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        return responseHandler.sendSuccess(res, {
          message: "user was updated successfully",
        });
      } else {
        return responseHandler.sendFailure(res, {
          code: 400,
          name: "no_such_user",
          message: `Cannot update user with id = ${id}. user not found/ Empty data supplied`,
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

//delete a user with the specified id
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        return responseHandler.sendSuccess(
          res,
          {
            message: "user deleted successfully",
          },
          204
        );
      } else {
        return responseHandler.sendFailure(res, {
          code: 400,
          name: "no_such_user",
          message: `no user exists with given id: ${id}`,
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

//delete all users from the database
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      if (nums > 0) {
        return responseHandler.sendSuccess(
          res,
          {
            message: `${nums} users were deleted successfully`,
          },
          204
        );
      } else {
        return responseHandler.sendFailure(res, {
          code: 400,
          name: "empty_data_set",
          message: "no user records were found",
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

//retrieve users added today
exports.findAllToday = (req, res) => {
  User.findAll({
    where: {
      created_at: {
        [Op.lt]: new Date(),
        [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000),
      },
    },
  })
    .then((data) => {
      if (!data) {
        return responseHandler.sendFailure(res, {
          code: 400,
          name: "empty_data_set",
          message: "no user records were found",
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

//removing user image
exports.removeImage = async (req, res) => {
  const id = req.params.id;
  if (req.file) {
    //delete image from file server @cloudinary
    await cloudinary.uploader.destroy(req.file.path, {
      folder: "church-test",
      public_id: req.body.username,
    });
    //then delete image from database table
    User.update(
      { image: null },
      {
        where: { id: id },
      }
    )
      .then((num) => {
        if (num == 1) {
          return responseHandler.sendSuccess(
            res,
            {
              message: "user image deleted successfully",
            },
            204
          );
        } else {
          return responseHandler.sendFailure(res, {
            code: 400,
            name: "no_such_user",
            message: `no user exists with given id: ${id}`,
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
  }
};
