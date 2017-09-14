const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const config = require('../config/config.json')
const UserSchema = mongoose.Schema({
    roles: {
        type: String,
        default: 'shopper',
        requied: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: false
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: [10, "Email requied length > 10"],
        unique: true,
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        minlength: [5, "User requied length > 5"],
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Pass requied length > 6"],
    },
    phone: {
        type: String,
        required: true,
        minlength: [10, "Phone requied length > 10"],
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})
UserSchema.statics.findToken = function(token) {
    var user = this
    var decoded;
    try {
        decoded = jwt.verify(token, config.secretkey)
        console.log(decoded);
    } catch (e) {
        return Promise.reject()
    }
    return user.findOne({
        '_id': decoded._id,
        // 'tokens.token': token,
        // 'tokens.access':'auth'
    })
}
UserSchema.methods.validPassword = function(password, callback) {
    return bcrypt.compare(password, this.password, function(err, matches) {
        if (!matches) {
            callback(matches)
        } else {
            callback(matches)
        }
    })
};
UserSchema.statics.findByCredentials = function(email, password) {
    var User = this
    return User.findOne({
        email
    }).then(user => {
        if (user) {
            return new Promise((resolve, reject) => {
                bcrypt.compare(password, user.password, (err, res) => {
                    if (res) {
                        resolve(user)
                    } else reject()
                })
            })
        }
    })
}
UserSchema.pre('save', function(next) {
    var user = this
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})
var updateDate = function(next) {
    var user = this;
    user.updated_at = new Date();
    next()
}
UserSchema.pre('update', updateDate)
// .pre('findOneAndUpdate', updateDate)
// .pre('findByIdAndUpdate', updateDate)
UserSchema.pre('findOneAndUpdate', function(next) {
    var user = this;
    var new_hash = "new_hash"
    var new_pwd = this.getUpdate().$set.password
    console.log("findOneAndUpdate: " + new_pwd)
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(new_pwd, salt, (err, hash) => {
            this.findOneAndUpdate({}, {
                password: hash
            })
            next()
        })
    })
    next()
})
UserSchema.methods.generateAuthenToken = function() {
    var user = this
    var access = 'auth'
    var token = jwt.sign({
        _id: user._id.toHexString(),
        access
    }, config.secretkey).toString()
    user.tokens.push({
        access,
        token
    })
    return user.save().then(() => {
        return token
    })
}
UserSchema.methods.removeToken = function(token) {
    var User = this
    return User.update({
        $pull: {
            tokens: {
                token
            }
        }
    })
}
var User = mongoose.model('User', UserSchema)
module.exports = {
    User
}