var express = require('express');
var router = express.Router();
const {Feedback} = require('../models/feedback')
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('home/index', {
        title: "Home Page",
        layout: false
    })
});
router.get('/contact', function(req, res, next) {
    res.render('home/contact', {
        title: "Contact Page"
    })
});
router.get('/service', function(req, res, next) {
    res.render('home/service', {
        isService: true,
        title: "Service Page"
    })
});
router.get('/email', function(req, res, next) {
    res.render('email/email-reset', {
        title: "Email Page",
        layout: false
    })
});

router.post('/send-feedback', function(req, res, next) {
    var fdb = Feedback({
        email: req.body["template-contactform-email"],
        phone: req.body["template-contactform-phone"],
        name: req.body["template-contactform-name"],
        subject: req.body["template-contactform-subject"],
        message: req.body["template-contactform-message"]
    })
    console.log(fdb)
    fdb.save((err, result) => {
        if (err) {
            console.log(err)
            return res.send({
                alert: 'error',
                message: "Something wrong on server"
            })
        }
        console.log(result)
        return res.send({
            alert: 'success',
            message: "Your message was sent !!!"
        })
    })
});

router.get('/confirm-code', (req, res, next)=>{
    res.render('user/check-code', {
        title: "Confirm Code"
    })
})
module.exports = router;