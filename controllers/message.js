const db = require("../models");
const Message = db.Message;
const mailerController = require("./mailer");

const responseHandler = require("../utils/responseHandler");
// creating and save a new Message
exports.create = (req, res) => {
  //validation
  if (!req.body) {
    return responseHandler.sendFailure(res, {
      code: 400,
      name: "missing_field",
      message: "name/email/phone/subject/message missing",
    });
  }
  if (!req.body.name) {
    return responseHandler.sendFailure(res, {
      code: 400,
      name: "missing_field",
      message: "name missing",
    });
  }
  if (!req.body.email) {
    return responseHandler.sendFailure(res, {
      code: 400,
      name: "missing_field",
      message: "email missing",
    });
  }
  if (!req.body.phone) {
    return responseHandler.sendFailure(res, {
      code: 400,
      name: "missing_field",
      message: "phone missing",
    });
  }
  if (!req.body.message) {
    return responseHandler.sendFailure(res, {
      code: 400,
      name: "missing_field",
      message: "message missing",
    });
  }

  //instantiate a Message object
  var message = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    message: req.body.message,
    subject: req.body.subject || "New Contact Message",
  };

  //save
  Message.create(message)
    .then(async (data) => {
      req.body.subject = req.body.subject || "New Contact Message";
      let emailContent = `<p>Hi, you have a new message</p><br/>
                <p>From: ${data.name}<br/>
                    Email: ${data.email} <br/>
                    Phone: ${data.phone} <br/>
                    Date: ${data.createAt} <br/>
                </p> <br/>
                <p>${data.message}</p>
                `;
      req.body.message = emailContent;

      // let emailResponse = await mailerController.sendEmail(req, res);

      // await mailerController.autoContactResponse(req, res);

      return responseHandler.sendSuccess(res, {
        message: (emailResponse.message += "message send successfully"),
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

//find a single Message with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Message.findOne({
    where: {
      id: id,
    },
  })
    .then((data) => {
      if (!data) {
        return responseHandler.sendFailure(res, {
          code: 400,
          name: "empty_data_set",
          message: "no message records were found",
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

// retrieve all Messages from the database
exports.findAll = (req, res) => {
  Message.findAll({
    where: req.query || null,
  })
    .then((data) => {
      if (!data) {
        return responseHandler.sendFailure(res, {
          code: 400,
          name: "empty_data_set",
          message: "no message records were found",
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

//update a Message by the id
exports.update = (req, res) => {
  const id = req.params.id;

  Message.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        return responseHandler.sendSuccess(res, {
          message: "message was updated successfully",
        });
      } else {
        return responseHandler.sendFailure(res, {
          code: 400,
          name: "no_such_message",
          message: `Cannot update message with id = ${id}. Message not found/ Empty data supplied`,
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

//delete a Message with the specified id
exports.delete = (req, res) => {
  const id = req.params.id;

  Message.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        return responseHandler.sendSuccess(
          res,
          {
            message: "message was deleted successfully",
          },
          204
        );
      } else {
        return responseHandler.sendFailure(res, {
          code: 400,
          name: "no_such_message",
          message: `Cannot delete message with id = ${id}. message not found/ Empty data supplied`,
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

//delete all Messages from the database
exports.deleteAll = (req, res) => {
  Message.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      if (nums > 0) {
        return responseHandler.sendSuccess(
          res,
          {
            message: `${nums} messages deleted successfully`,
          },
          204
        );
      } else {
        return responseHandler.sendFailure(res, {
          code: 400,
          name: "empty_data_set",
          message: "no message records were found",
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
