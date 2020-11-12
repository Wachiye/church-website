require("dotenv").config();
const Mpesa = require("mpesa-api");

const credentials= {
    client_key: process.env.MPESA_CONSUMER_KEY,
    client_secret: process.env.MPESA_CONSUMER_SECRET,
    initiator_password: MPESA_INITIATOR_PASSWORD
};

const environment = process.env.MPESA_ENV;

const mpesa = new Mpesa(credentials, environment);

const moment = require("moment");
const request = require("request");
mpesa
  .c2bregister({
    ShortCode: "Short Code",
    ConfirmationURL: "Confirmation URL",
    ValidationURL: "Validation URL",
    ResponseType: "Response Type",
  })
  .then((response) => {
    //Do something with the response
    //eg
    console.log(response);
  })
  .catch((error) => {
    //Do something with the error;
    //eg
    console.error(error);
  });

  mpesa
  .c2bsimulate({
    ShortCode: 123456,
    Amount: 1000 /* 1000 is an example amount */,
    Msisdn: 254792123456,
    CommandID: "Command ID" /* OPTIONAL */,
    BillRefNumber: "Bill Reference Number" /* OPTIONAL */,
  })
  .then((response) => {
    //Do something with the response
    //eg
    console.log(response);
  })
  .catch((error) => {
    //Do something with the error;
    //eg
    console.error(error);
  });
