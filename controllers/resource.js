const db = require("../models");
const Op = db.Sequelize.Op;
const Resource = db.Resource;
const cloudinary = require("../utils/cloudinary");
const responseHandler = require("../utils/responseHandler");
// creating and save a new Resource
exports.create = async (req, res) => {
  //validation
  if (!req.body) {
    return responseHandler.sendFailure(res, {
      code: 400,
      name: "missing_field",
      message:
        "type(form/e_book/story)/title/description/content/file/url missing",
    });
  }
  if (!req.body.type) {
    return responseHandler.sendFailure(res, {
      code: 400,
      name: "missing_field",
      message: "type(form/e-book/story) missing",
    });
  }
  if (!req.body.title) {
    return responseHandler.sendFailure(res, {
      code: 400,
      name: "missing_field",
      message: "title missing",
    });
  }
  if (!req.body.description) {
    return responseHandler.sendFailure(res, {
      code: 400,
      name: "missing_field",
      message: "description missing",
    });
  }
  if (req.body.type == "ebook" || req.body.type == "story") {
    if (!req.body.content) {
      return responseHandler.sendFailure(res, {
        code: 400,
        name: "missing_field",
        message: "Resource content  for type(ebook/story) is required",
      });
    }
    req.body.content = req.body.description;
  }
  if (!req.file) {
    return responseHandler.sendFailure(res, {
      code: 400,
      name: "missing_field",
      message: "file missing",
    });
  }
  if (req.body.type == "form" && !req.body.url) {
    return responseHandler.sendFailure(res, {
      code: 400,
      name: "missing_field",
      message: "Resource url for form type is required.",
    });
  }
  //instantiate a Resource object
  var resource = {
    type: req.body.type,
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
    url: req.body.url || null,
  };
  //upload file to cloudinary
  let uploadedImage = await cloudinary.uploader.upload(req.file.path, {
    folder: "church-test",
    public_id: resource.title,
  });
  //get the file url
  resource.image = uploadedImage.secure_url;

  //save
  Resource.create(resource)
    .then((data) => {
      return responseHandler.sendSuccess(res, {
        data,
        message: "resources added successfully",
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

//find a single Resource with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Resource.findOne({
    id: id,
    include: [
      {
        model: db.User,
      },
    ],
  })
    .then(data => {
      if (!data) {
        return responseHandler.sendFailure(res, {
          code: 400,
          name: "no_such_resources",
          message: `no resource exists with  given id: ${id}`,
        });
      } else {
        return responseHandler.sendSuccess(res, data);
      }
    })
    .catch(err => {
      return responseHandler.sendFailure(res, {
        code: 500,
        name: "database_err",
        message: err.message || null,
      });
    });
};

// retrieve all Resources from the database
exports.findAll = (req, res) => {
  Resource.findAll({
    include: [
      {
        model: db.User,
      },
    ],
  })
    .then((data) => {
      if (!data || (data && data.length === 0)) {
        return responseHandler.sendFailure(res, {
          code: 400,
          name: "empty_data_set",
          message: "no resource records were found",
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

//update a Resource by the id
exports.update = async (req, res) => {
  const id = req.params.id;
  let uploadedImage;

  if (req.file) {
    uploadedImage = await cloudinary.uploader.upload(req.file.path, {
      folder: "church-test",
      public_id: req.body.title,
    });
    req.body.image = uploadedImage.secure_url;
  }

  Resource.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        return responseHandler.sendSuccess(res, {
          message: "resource was updated successfully",
        });
      } else {
        return responseHandler.sendFailure(res, {
          code: 400,
          name: "no_such_resource",
          message: `Cannot update resource with id = ${id}. resource not found/ Empty data supplied`,
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

//delete a Resource with the specified id
exports.delete = (req, res) => {
  const id = req.params.id;

  Resource.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        return responseHandler.sendSuccess(
          res,
          {
            message: "resource was deleted successfully",
          },
          204
        );
      } else {
        return responseHandler.sendFailure(res, {
          code: 400,
          name: "no_such_resource",
          message: `no resource exists with given id: ${id}`,
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

//delete all Resources from the database
exports.deleteAll = (req, res) => {
  Resource.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      if (nums > 0) {
        return responseHandler.sendSuccess(
          res,
          {
            message: `${nums} resources were deleted successfully`,
          },
          204
        );
      } else {
        return responseHandler.sendFailure(res, {
          code: 400,
          name: "empty_data_set",
          message: "no resource records were found",
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
