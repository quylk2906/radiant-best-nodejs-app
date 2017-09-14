const mongoose = require('mongoose');
const config = require('../config/config.json')

const OderSchema =  mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cart: {
        type: Object,
        required: true
    },
    company: {
        type: String,
        default: ""
    },
    organization: {
        type: String,
        default: ""
    },
    purpose: {
        type: String,
        default: ""
    },
    status: {
        type: Number,
        default: 0
    },
    total: {
        type: String,
        //   required: true,
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

// OderSchema.pre('save', function(next) {
//     var self = this;
//     self.created_at = new Date();
//     next()
// })

// var updateDate = function(next) {
//     var self = this;
//     self.updated_at = new Date();
//     if (!self.created_at) {
//         self.created_at = now;
//     }
//     next()
// }

// OderSchema.pre('update', updateDate)
//     .pre('findOneAndUpdate', updateDate)
//     .pre('findByIdAndUpdate', updateDate)



var Order = mongoose.model('Oder', OderSchema)

module.exports = {
    Order
}
