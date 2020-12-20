const err_list = require("../assets/errors");

function makeError(code, name, message) {
  var err = err_list.filter((er) => er.code === code)[0];

  if (err) {
    err.code = code;
    err.message = message ? message : err.message;
    err.name = name ? name : err.name;
  } else {
    err = {
      code: code,
      name: name,
      message: message,
    };
  }

  var e = new Error(err.message);
  e.code = err.code;
  e.message = err.message;
  e.name = err.name;
  return e;
}
exports.sendSuccess = (res, data, code) => {
  var output = { error: null, data: data };
  code ? res.status(code).json(output) : res.json(output);
};
exports.sendFailure = (res, err, data = []) => {
  let e = makeError(err.code, err.name, err.message);
  res.status(e.code).json({ error: e, data, message: e.message });
};
exports.invalidResource = (res) => {
  let e = makeError(404);
  res.status(e.code).json({ error: e, message: e.message });
};
