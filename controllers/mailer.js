const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
require("dotenv").config();

exports.sendEmail = async(req, res) => {
    return new Promise( (resolve, reject) => {
        let data;
        const options = {
            service: process.env.MAIL_SERVICE,
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        };

        var mailOptions = {
            from: process.env.MAIL_USER || req.body.from,
            to: req.body.to || process.env.MAIL_USER,
            subject: req.body.subject,
            html:req.body.message,
        };

        //create a reusable transporter
        let transporter = nodemailer.createTransport(smtpTransport(options));

        //send email
        transporter.sendMail(mailOptions, (err, email) => {
            if (err) {
                data = {
                    message: err.message || "Error: Could not send email. Try again later",
                    send: false
                }
                reject(data.message);
            } else {
                data = {
                    message: email.response || "Email was send successfully",
                    send: true
                };
                resolve(data);
            }
        });
    }); 
}

exports.autoContactResponse = async(req, res) => {
    return new Promise( (resolve, reject) => {
        let data;
        const options = {
            service: process.env.MAIL_SERVICE,
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        };

        const message = `<p>Dear <em><b>${req.body.name}</b></em></p> <br/>
            <p>This is to confirm that we have received your message. We will be working on your enquiry along with other messages that we have received in a couple of days.<br/>
            Upon review, we shall contact you.<br/>
            Please be patient.</p>`

        var mailOptions = {
            from: process.env.MAIL_USER ,
            to: req.body.from || req.body.email,
            subject: 'Message Received',
            html:message,
        };

        //create a reusable transporter
        let transporter = nodemailer.createTransport(smtpTransport(options));

        //send email
        transporter.sendMail(mailOptions, (err, email) => {
            if (err) {
                data = {
                    message: err.message || "Error: Could not send email. Try again later",
                    send: false
                }
                reject(data.message);
            } else {
                data = {
                    message: email || "Email was send successfully",
                    send: true
                };
                resolve(data);
            }
        });
    }); 
}