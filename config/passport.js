var passport = require('passport');
var {
    User
} = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;
const _ = require('lodash')

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

// passport.use('local.register', new LocalStrategy({
//     usernameField: 'register_form_email',
//     passwordField: 'register_form_password',
//     passReqToCallback: true
// }, function(req, email, password, done) {
//     req.checkBody('register_form_email', 'Invalid email.').notEmpty().isEmail();
//     req.checkBody('register_form_phone', 'Phone does not empty and length > 10.').notEmpty().isLength({
//         min: 10
//     });
//     req.checkBody('register_form_fullname', 'Fullname does not empty and length > 6.').notEmpty().isLength({
//         min: 6
//     });
//     req.checkBody('register_form_password', 'Invalid password: does not empty and length > 6.').notEmpty().isLength({
//         min: 6
//     });
//     req.checkBody('register_form_confirm_password', 'Password does not match').notEmpty().equals(req.body.register_form_password)
//     var body = _.pick(req.body, ['register_form_email', 'register_form_password', 'register_form_fullname', 'register_form_phone'])
//     var errors = req.validationErrors();
//     console.log(body);
//     if (errors) {
//          var messages = [];
//          errors.forEach(function(error) {
//             messages.push(error.msg);
//          });
//          return done(null, false, req.flash('error', messages));
//      }
//     User.findOne({
//         'email': email
//     }, function(err, user) {
//         if (err) {
//             return done(err);
//         }
//         if (user) {
//             return done(null, false, {
//                 message: 'Email is already in use.'
//             });
//         }
//         var newUser = new User();
//         newUser.email = body.register_form_email;
//         newUser.password = body.register_form_password;
//         newUser.phone = body.register_form_phone
//         newUser.fullname = body.register_form_fullname
//         newUser.save(function(err, result) {
//             if (err) {
//                 return done(err);
//             }
//         }).then(() => {
//            return newUser.generateAuthenToken()
//         }).then((token) => {
//            return done(null, newUser, {
//              message: "Welcome! " + newUser.fullname
//           });
//         });
//     });
// }));

passport.use('local.login', new LocalStrategy({
    usernameField: 'login_form_email',
    passwordField: 'login_form_password',
    passReqToCallback: true
}, function(req, email, password, done) {
    req.checkBody('login_form_email', 'Invalid email.').notEmpty().isEmail();
    req.checkBody('login_form_password', 'Invalid password.').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }

    User.findOne({
        'email': email
    }, function(err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {
                message: 'Email not found.'
            });
        }
        if (user.isActive === false) {
            return done(null, false, {
                message: 'This user still not active.'
            });}

        user.validPassword(password, (res) => {
           if (!res) {
             return done(null, false, {
                  message: 'Wrong password.'
              });
           } else {
             return done(null, user, {
                 message: "Welcome! " + user.fullname
             });
           }
        })
    });
}));
