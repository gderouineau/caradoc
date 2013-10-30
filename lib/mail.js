/**
 * Created by GD on 11/10/13.
 */

/*
 * CALL /config/params.js
 */

var params = require('../../../config/params/mail');

/*
 * Setting of the mail system using module nodemailer
 */
var nodemailer = require("nodemailer");
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: params.data.service,
    auth: {
        user: params.data.user,
        pass: params.data.pass
    }
});

/*
 * Export of the module mail
 */
exports.send = function(from, to, subject, text, html){

    this.from = from;
    this.to = to;
    this.subject = subject;
    this.text = text;
    this.html = html;

    this.send =  function(from, to, subject, text, html) {
        var options = {
            from    : this.from,
            to      : this.to,
            subject : this.subject,
            text    : this.text,
            html    : this.html

        };
        console.log(options);
        smtpTransport.sendMail(options, function(error, response){
            if(error){
                console.log(error);
                return(false);
            }else{
                console.log("Message sent: " + response.message);
                return(true);
            }

        });

    }


};