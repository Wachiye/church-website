const db = require("../models");
const Op = db.Sequelize.Op;
const Event = db.Event;
const responseHandler = require("../utils/responseHandler");
// creating and save a new Event
exports.create = async (req, res) => {
  //validation
  if (!req.body) {
    return responseHandler.sendFailure(res, {
      code: 400,
      name: "missing_field",
      message: "title/description/from/to/ministry_id/file missing",
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
  if (!req.body.from) {
    return responseHandler.sendFailure(res, {
      code: 400,
      name: "missing_field",
      message: "from(date) missing",
    });
  }
  if (!req.body.to) {
    return responseHandler.sendFailure(res, {
      code: 400,
      name: "missing_field",
      message: "to(date) missing",
    });
  }
  //create Event
  const event = {
    title: req.body.title,
    description: req.body.description,
    from: req.body.from,
    to: req.body.to,
    ministry_id: req.body.ministry_id,
  };

  let uploadedImage;

  if (req.file) {
    uploadedImage = await cloudinary.uploader.upload(req.file.path);
    event.image = uploadedImage.secure_url;
  } else {
    event.image = "img/event.jpg";
  }
  //save Event
  Event.create(event)
    .then((data) => {
      return responseHandler.sendSuccess(res, {
        data,
        message: "event added successfully",
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

//find a single Event with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Event.findByPk(id)
    .then((data) => {
      if (!data) {
        return responseHandler.sendFailure(res, {
          code: 500,
          name: "no_such_event",
          message: `no event exists with given id: ${id}`,
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

// retrieve all events from the database
exports.findAll = (req, res) => {
  Event.findAll({ where: req.query || null })
    .then(data => {
      if (!data || (data  && data.length == 0)) {
        return responseHandler.sendFailure(res, {
          code: 500,
          name: "empty_data_set",
          message: "no event records were found",
        });
      }
      return responseHandler.sendSuccess(res, data);
    })
    .catch(err => {
      return responseHandler.sendFailure(res, {
        code: 500,
        name: "database_err",
        message: err.message || null,
      });
    });
};

//update a Event by the id
exports.update = async (req, res) => {
  const id = req.params.id;
  let uploadedImage;

  if (req.file) {
    uploadedImage = await cloudinary.uploader.upload(req.file.path);
    req.body.image = uploadedImage.secure_url;
  }

  Event.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        return responseHandler.sendSuccess(res, {
          message: "Event was updated successfully",
        });
      } else {
        return responseHandler.sendFailure(res, {
          code: 400,
          name: "no_such_event",
          message: `Cannot update Event with id = ${id}. Event not found/ Empty data supplied`,
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

//delete a Event with the specified id
exports.delete = (req, res) => {
  const id = req.params.id;

  Event.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        return responseHandler.sendSuccess(
          res,
          {
            message: "Event was deleted successfully",
          },
          204
        );
      } else {
        return responseHandler.sendFailure(res, {
          code: 400,
          name: "no_such_event",
          message: `Cannot delete Event with id = ${id}. Event not found!`,
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

//delete all events from the database
exports.deleteAll = (req, res) => {
  Event.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      if (nums > 0) {
        return responseHandler.sendSuccess(
          res,
          {
            message: `${nums} events were deleted successfully`,
          },
          204
        );
      } else {
        return responseHandler.sendFailure(res, {
          code: 500,
          name: "empty_data_set",
          message: "no event records were found",
        });
      }
    })
    .catch((err) => {
      return responseHandler.sendFailure(res, {
        code: 400,
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
  Event.findAll({
    where: {
      from: from_date_range,
    },
  })
    .then((data) => {
      if (!data) {
        return responseHandler.sendFailure(res, {
          code: 400,
          name: "empty_data_set",
          message: "no event records were found",
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

//find all upcoming events
exports.findAllUpcoming = (req, res) => {
  Event.findAll({
    where: {
      from: {
        [Op.gt]: new Date(),
      },
    },
  })
    .then((data) => {
      if (!data) {
        return responseHandler.sendFailure(res, {
          code: 400,
          name: "empty_data_set",
          message: "no event records were found",
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

//find all finished events
exports.findAllFinished = (req, res) => {
  Event.findAll({
    where: {
      to: {
        [Op.lt]: new Date(),
      },
    },
  })
    .then((data) => {
      if (!data) {
        return responseHandler.sendFailure(res, {
          code: 400,
          name: "empty_data_set",
          message: "no event records were found",
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

//find all upcoming events
exports.findAllTodayOrUpcoming = (req, res) => {
  var from_date_range = {
    [Op.lt]: new Date(), //now
    [Op.gte]: new Date() + 24 * 60 * 60 * 1000, //24 hours ago
  };
  Event.findAll({
    where: {
      from: from_date_range,
    },
  })
    .then((data) => {
      if (!data) {
        return responseHandler.sendFailure(res, {
          code: 400,
          name: "empty_data_set",
          message: "no event records were found",
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
