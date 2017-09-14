const mongoose = require('mongoose');
const randomstring = require('randomstring')


const TestdocSchema =  mongoose.Schema({
    _id: {
        type: Number,
        required: true,
    },
    sku: {
        type: String,
        default: "Someone trying to hack your web site"
    },
    description: {
        type: String,
        required: true,
        default: "Someone trying to hack your web site"
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


var Testdoc = mongoose.model('Testdoc', TestdocSchema)

module.exports = {
    Testdoc
}
