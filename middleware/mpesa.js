require("dotenv").config();

const request = require("request");

exports.access = (req, res, next) => {
    //Access token
    let consumer_key = process.env.MPESA_CONSUMER_KEY;
    let consumer_secret = process.env.MPESA_CONSUMER_SECRET; //your app consumer secret
    let url = process.env.MPESA_AUTHENTICATION_URL; //Authentication url 

    let auth = new Buffer.from(`${consumer_key}:${consumer_secret}`).toString('base64');
    let headers = {
        Authorization: `Basic ${auth}`
    };

    request({url:url, headers: headers}, (error, res, body) => {
        if(error){
            res.statusCode(500).json({
                message:"Error: Could not initiate mpesa transaction"
            })
        }
        else {
            req.access_token = JSON.parse(body).access_token;
            next();
        }
    });
}