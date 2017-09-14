const mongoose = require('mongoose');
const randomstring = require('randomstring')


const ResetCodeSchema =  mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    code: {
        type: String,
        unique: true,
        maxlength: 10,
        // minlength: 8,
        default: ""
    },
    date_expired: {
        type: Date,
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

ResetCodeSchema.pre('save', function(next) {
    var self = this;
    var date = new Date()
    self.date_expired = date.setTime(self.created_at.getTime() + (2*60*60*1000))
    self.code = randomstring.generate(8)
    next()
})

// var updateDate = function(next) {
//     var self = this;
//     self.updated_at = new Date();
//     // if (!self.created_at) {
//     //     self.created_at = now;
//     // }
//     next()
// }

// ResetCodeSchema.pre('update', updateDate)
//     .pre('findOneAndUpdate', updateDate)
//     .pre('findByIdAndUpdate', updateDate)


var ResetCode = mongoose.model('resetCode', ResetCodeSchema)

module.exports = {
    ResetCode
}
