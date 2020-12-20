require("dotenv").config();

const request = require("request");
const moment = require('moment');
const responseHandler = require("../utils/responseHandler");

exports.processPayment = async(req, res) => {
    let endpoint = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
    let auth = `Bearer ${req.access_token}`;
    let shortcode = process.env.MPESA_SHORTCODE;
    let passkey = process.env.MPESA_PASSKEY;
    let timestamp = moment().format('YYYYMMDDHHmmss');

    const password = new Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');

    request(
        {
            url: endpoint,
            method: "POST",
            headers: {
                'Authorization': auth
        },
        json: {
            "BusinessShortCode": shortcode,
            "Password": password,
            "Timestamp": `${timestamp}`,
            "TransactionType": "CustomerPayBillOnline",
            "Amount": req.body.amount,
            "PartyA": req.body.phone,
            "PartyB": shortcode,
            "PhoneNumber": req.body.phone,
            "CallBackURL": req.body.callback_url,
            "AccountReference": req.body.accountRef,
            "TransactionDesc": req.body.description || req.body.purpose
            }
        },

        async function(error, response, body){
            if(error){
                return responseHandler.sendFailure(res,{
                    code: 500,
                    name: "mpesa_payment_err",
                    message: error.message || "An error occurred while processing your mpesa payment"
                });
            }else{
                return responseHandler.sendSuccess(res,body);
            } 
        }
    );
}

exports.confirmPayment = async(req, res, next) => {
    let mpesaResponse = req.body.stkCallBack;
    console.log(mpesaResponse);
    res.json(mpesaResponse)
}