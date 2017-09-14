const nodemailer = require("nodemailer")
const hbs = require('nodemailer-express-handlebars');
const config =  require('../../config/config.json')
// create reusable transport method (opens pool of SMTP connections)
// var smtpTransport = nodemailer.createTransport("SMTP", {
//     service: "Gmail",
//     auth: {
//         user: "quylk2906@gmail.com",
//         pass: "SingMeToSleep@gmail.com"
//         user: "lkquyit@gmail.com",
//         pass: "nguyetheo"
//     }
// });
var smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    // secure: true,
    auth: {
        user: "lkquyit@gmail.com",
        pass: "nguyetheo"
    },
    tls: {
        rejectUnauthorized: false
    },
    debug: true
});
// 
// setup e-mail data with unicode symbols
// 
// send mail with defined transport object
// 
smtpTransport.use('compile', hbs({
    viewPath: 'views/email',
    extName: '.hbs',
}));
var nodeMailer = function(type, email_received, code) {
    var mailOptions = {}
    // console.log(`${config.domain}/users/${type}/${code}`)
    // console.log(email_received)
    if (type === "active") {
        mailOptions = {
            from: "Welcome Heroku App <lkquyit2906@gmail.com>", // sender address
            to: email_received, // list of receivers
            subject: "Active your account", // Subject line
            template: 'email-active',
            context: {
                url: `${config.domain}/users/active-account/${code}`
            },
        }
    } else if (type === "reset") {
        mailOptions = {
            from: "Welcome Heroku App <lkquyit2906@gmail.com>", // sender address
            to: email_received, // list of receivers
            subject: "Reset your password", // Subject line
            template: 'email-reset',
            context: {
                url: `${config.domain}/users/reset-password/${code}`,
                code: code
            },
        }
    }
    smtpTransport.sendMail(mailOptions, function(error, response) {
        // if (error) {
        //     return console.log(error);
        // }
        return console.log(error || response);
        // if you don't want to use this transport object anymore, uncomment following line
        //smtpTransport.close(); // shut down the connection pool, no more messages
    });
    console.log("Message sent: " + JSON.stringify(mailOptions));
}
module.exports.nodeMailer = nodeMailer