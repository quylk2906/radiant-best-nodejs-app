const mongoose = require('mongoose');
const randomstring = require('randomstring')


const FeedbackSchema =  mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        default: "Someone trying to hack your web site"
    },
    phone: {
        type: String,
        required: true,
        default: "Someone trying to hack your web site"
    },
    subject: {
        type: String,
        default: "Someone trying to hack your web site"
    },
    message: {
        type: String,
        default: "Someone trying to hack your web site"
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

// FeedbackSchema.pre('save', function(next) {
//     var self = this;
//     var date = new Date()
//     next()
// })

// var updateDate = function(next) {
//     var self = this;
//     self.updated_at = new Date();
//     // if (!self.created_at) {
//     //     self.created_at = now;
//     // }
//     next()
// }

// FeedbackSchema.pre('update', updateDate)
//     .pre('findOneAndUpdate', updateDate)
//     .pre('findByIdAndUpdate', updateDate)


var Feedback = mongoose.model('Feedback', FeedbackSchema)

module.exports = {
    Feedback
}
