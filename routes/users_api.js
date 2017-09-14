var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const randomstring = require('randomstring')
const _ = require('lodash')
const passport = require('passport');
const {
    Order
} = require('../models/order')
const {
    ActiveCode
} = require('../models/active_code');
const {
    ResetCode
} = require('../models/reset_code');
const {
    User
} = require('../models/user');
const nodeMailer = require('../api/nodemailer')
const Cart = require('../models/cart')
/* GET users listing. */
router.get('/profile', isLoggedIn, function(req, res, next) {
    var successMsg = req.flash('success')[0]
    Order.find({
        user_id: req.user._id
    }, (err, docs) => {
        if (err) {
            return res.render('shop/check-out', {
                products: null
            })
        }
        var cart;
        docs.forEach((order) => {
            cart = new Cart(order.cart)
            cart.generateArray()
        })
        res.render('user/profile', {
            successMsg: successMsg,
            noMessage: !successMsg,
            fullname: req.user.fullname,
            roles: req.user.roles,
            orders: docs,
            title: "Profile Page"
        })
        console.log(docs);
    })
});
router.get('/edit-profile', isLoggedIn, function(req, res, next) {
    res.render('user/edit-profile', {
        fullname: req.user.fullname,
        roles: req.user.roles,
        title: "Edit Profile"
    })
});
router.get('/logout', isLoggedIn, function(req, res, next) {
    req.logout()
    res.redirect('/users/login')
});
router.post('/change-password', isLoggedIn, function(req, res, next) {
    var _id = req.user._id
    var new_pwd = undefined
    if (req.body.register_form_password != "" && req.body.register_form_confirm_password != "" && (req.body.register_form_confirm_password == req.body.register_form_password)) {
        new_pwd = req.body.register_form_password
    }
    if (_id) {
        var old_pwd = req.body.form_old_password
        User.findById({
            _id: mongoose.Types.ObjectId(_id)
        }, (err, user) => {
            user.validPassword(old_pwd, (match) => {
                if (!match) {
                    var data = {
                        alert: 'error',
                        message: "Old password incorrect!!!"
                    }
                    return res.send(data)
                } else {
                    User.findOneAndUpdate({
                        _id: mongoose.Types.ObjectId(_id)
                    }, {
                        $set: {
                            fullname: req.body.register_form_fullname,
                            phone: req.body.register_form_phone,
                            password: new_pwd == undefined ? old_pwd : new_pwd
                        }
                    }, () => {})
                    var data = {
                        alert: 'success',
                        fullname: req.body.register_form_fullname,
                        message: "Update information successful!!!"
                    }
                    return res.send(data)
                }
            })
        })
    }
});
router.use('/', notLoggedIn, (req, res, next) => {
    next()
})
router.get('/reset-password', function(req, res, next) {
    var message = req.flash('forgot-message')
    res.render('user/forgot-password', {
        noMessages: message.length > 0 ? false : true,
        errormsg: req.flash('status'),
        message: message,
        title: "Reset Password"
    });
});
router.get('/register', function(req, res, next) {
    var errorMsg = req.flash('error')[0]
    res.render('user/login-register', {
        errorMsg: errorMsg,
        noMessage: !errorMsg,
        isLogin: true,
        title: "Register Page"
    })
});
router.get('/login', function(req, res, next) {
    var errorMsg = req.flash('error')[0]
    var success = req.flash('success')
    res.render('user/login-register', {
        errorMsg: errorMsg,
        noMessage: !errorMsg,
        isLogin: true,
        noSuccessMessage: success.length > 0 ? false : true,
        successMsg: success,
        title: "Login Page"
    })
});
router.get('/active-account/:code', function(req, res, next) {
    var request_code = req.params.code
    console.log(request_code)
    ActiveCode.findOne({
        code: request_code
    }, (err, result) => {
        if (err) {
            return res.send({
                status: 500,
                message: "Email not found"
            })
        }
        User.update({
            email: result.email
        }, {
            $set: {
                isActive: true
            }
        }, (err, user) => {
            if (err) {
                return res.send({
                    status: 500,
                    message: "Something wrong"
                })
            }
            ActiveCode.remove({
                email: result.email
            }, (err, res) => {})
        })
    }).then(() => {
        req.flash('success', "Your email have activated")
        res.redirect('/users/login')
    })
});
/* POST users listing. */
// router.post('/register', passport.authenticate('local.register', {
//     failureRedirect: '/users/register',
//     failureFlash: true,
//     successFlash: true
// }), (req, res, next) => {
//     if (req.session.oldURL) {
//         var oldUrl = req.session.oldURL
//         req.session.oldURL = null
//         res.redirect(oldUrl)
//     } else
//         res.redirect('/users/profile')
// })
// 
router.post('/register', (req, res, next) => {
    req.checkBody('register_form_email', 'Invalid email.').notEmpty().isEmail();
    req.checkBody('register_form_phone', 'Phone does not empty and length > 10.').notEmpty().isLength({
        min: 10
    });
    req.checkBody('register_form_fullname', 'Fullname does not empty and length > 6.').notEmpty().isLength({
        min: 6
    });
    req.checkBody('register_form_password', 'Invalid password: does not empty and length > 6.').notEmpty().isLength({
        min: 6
    });
    req.checkBody('register_form_confirm_password', 'Password does not match').notEmpty().equals(req.body.register_form_password)
    var body = _.pick(req.body, ['register_form_email', 'register_form_password', 'register_form_fullname', 'register_form_phone'])
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        req.flash('error', messages);
        return res.redirect('/users/login');
    }
    var newUser = new User();
    newUser.email = body.register_form_email
    newUser.password = body.register_form_password
    newUser.phone = body.register_form_phone
    newUser.fullname = body.register_form_fullname
    newUser.save(function(err, result) {
        if (err) {
            return res.send(err);
        }
        result.generateAuthenToken()
    }).then(() => {
        var active_code = ActiveCode({
            email: body.register_form_email
        })
        // active_code.save()
        return active_code.save()
    }).then((code) => {
        nodeMailer.nodeMailer("active", body.register_form_email, code.code);
        req.flash('success', 'Check your email to activate your account !!!');
        return res.redirect('/users/login');
    });
})
router.post('/login', passport.authenticate('local.login', {
    failureRedirect: '/users/login',
    failureFlash: true,
    successFlash: true
}), (req, res, next) => {
    if (req.session.oldURL) {
        var oldUrl = req.session.oldURL
        req.session.oldURL = null
        res.redirect(oldUrl)
    } else res.redirect('/users/profile')
})
router.post('/reset-password', function(req, res, next) {
    User.findOne({
        email: req.body.reset_form_email
    }).then(user => {
        if (!user) {
            req.flash('status', "errormsg")
            req.flash('forgot-message', "Email not found !!!")
            console.log("then 1")
            return res.redirect('/users/reset-password');
        } else {
            ResetCode.findOne({
                email: req.body.reset_form_email
            }).then(code => {
                if (code) {
                    req.flash('status', "errormsg")
                    req.flash('forgot-message', "You've already reveiced email !!!")
                    console.log("then 2")
                    return res.redirect('/users/reset-password');
                }
            }).then(() => {
                ResetCode({
                    email: req.body.reset_form_email
                }).save().then(code => {
                    nodeMailer.nodeMailer("reset", req.body.reset_form_email, code.code);
                    req.flash('status', "successmsg")
                    req.flash('forgot-message', "The new password was sent your email !!!")
                    console.log("then 3")
                    return res.redirect('/users/reset-password');
                })
            })
        }
    })
    // req.flash('forgot-message', "Email not found")
    // req.flash('status', "errormsg")
    // req.flash('forgot-message', "The new password was sent your email")
    // req.flash('status', "successmsg")
    // 
    // 
    // check whether duplicate request forgot password
    // res.redirect('/users/reset-password');
});
router.post('/check-code', function(req, res, next) {
    ResetCode.findOne({
        code: req.body.code
    }).then(code => {
        if (!code) {
            res.send({
                status: false,
                message: "Code invalid. Please Try Again !!!"
            })
        } else {
            res.send({
                status: true,
                message: ""
            })
        }
    })
})
router.post('/change-password-code', function(req, res, next) {
    var new_pwd = req.body.new_pwd
    var reset_code = req.body.code
    ResetCode.findOne({
        code: reset_code
    }).then(code => {
        User.findOneAndUpdate({
            email: code.email
        }, {
            $set: {
                password: new_pwd
            }
        }, () => {})
        return code
    }).then((code) => {
        console.log("get code twice")
        console.log(code)
        ResetCode.remove({
            email: code.email
        }, () => {})
    }).then(() => {
        return res.send({
            status: true,
            message: "Password was changed !!!"
        })
    })
    // return res.send({
    //     status: false,
    //     mesage: "Warning. Hacking !!!"
    // })
})
module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/')
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next()
    }
    res.redirect('/')
}