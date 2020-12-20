const db = require("../models");
const Sermon = db.Sermon;
const responseHandler = require("../utils/responseHandler");
// creating and save a new Sermon
exports.create = (req, res) => {
  //validation
  if (!req.body) {
    return responseHandler.sendFailure(res, {
      code: 400,
      name: "missing_field",
      message: "title/description/verse/content missing",
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
  if (!req.body.content) {
    return responseHandler.sendFailure(res, {
      code: 400,
      name: "missing_field",
      message: "content missing",
    });
  }

  //instantiate a Sermon object
  var sermon = {
    title: req.body.title,
    description: req.body.description,
    verse: req.body.verse || null,
    content: req.body.content,
  };

  //save
  Sermon.create(sermon)
    .then((data) => {
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

//find a single Sermon with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Sermon.findOne({
    where: {
      id: id,
    },
  })
    .then((data) => {
      if (!data || (data && data.length == 0)) {
        return responseHandler.sendFailure(res, {
          code: 400,
          name: "no_such_sermon",
          message: `no sermon exists with given id: ${id}`,
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

// retrieve all Sermons from the database
exports.findAll = (req, res) => {
  Sermon.findAll({
    where: req.query || null,
  })
    .then((data) => {
      if (!data || (data && data.length === 0)) {
        return responseHandler.sendFailure(res, {
          code: 400,
          name: "empty_data_set",
          message: "no sermon records were found",
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

//update a Sermon by the id
exports.update = (req, res) => {
  const id = req.params.id;

  Sermon.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        return responseHandler.sendSuccess(res, {
          message: "sermon was updated successfully",
        });
      } else {
        return responseHandler.sendFailure(res, {
          code: 400,
          name: "no_such_sermon",
          message: `Cannot update sermon with id = ${id}. sermon not found/ Empty data supplied`,
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

//delete a Sermon with the specified id
exports.delete = (req, res) => {
  const id = req.params.id;

  Sermon.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        return responseHandler.sendSuccess(
          res,
          {
            message: "sermon was deleted successfully",
          },
          204
        );
      } else {
        return responseHandler.sendFailure(res, {
          code: 400,
          name: "no_such_sermon",
          message: `no sermon exists with given id: ${id}`,
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

//delete all Sermons from the database
exports.deleteAll = (req, res) => {
  Sermon.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      if (nums > 0) {
        return responseHandler.sendSuccess(
          res,
          {
            message: `${nums} sermon were deleted successfully`,
          },
          204
        );
      } else {
        return responseHandler.sendFailure(res, {
          code: 400,
          name: "empty_data_set",
          message: "no sermon records were found",
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
