const mongoose = require('mongoose');
const config = require('../config/config.json')
const ProductSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    title_meta: {
        type: String,
        required: true,
        trim: true,
        minlength: [5, "User requied length > 5"],
    },
    price: {
        type: Number,
        required: true,
        trim: true,
        default: 0
    },
    sale: {
        type: Number,
        default: 0
    },
    thumbnail: {
        type: String,
        trim: true,
        default: ''
    },
    image: {
        type: String,
        default: 'https://themeforest.net'
    },
    gallery: {
        type: Object,
        count: Number,
        default: {
            data: {
                name: "abc",
                name1: "abc"
            },
        }
    },
    sku: {
        trim: true,
        type: String,
    },
    category: {
        trim: true,
        type: String,
        required: true
    },
    group: {
        trim: true,
        type: String,
        required: true
    },
    description: {
        type: String
    },
    link: {
        type: String,
        trim: true,
        required: true
    },
    rate: {
        type: Number,
        default: 0
    },
    review: {
        type: String,
        default: ""
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})
// ProductSchema.pre('save', function(next) {
//     var self = this;
//     self.created_at = new Date();
//     next()
// })
var updateDate = function(next) {
    var self = this;
    self.updated_at = new Date();
    if (!self.created_at) {
        self.created_at = now;
    }
    next()
}
ProductSchema.pre('update', updateDate).pre('findOneAndUpdate', updateDate).pre('findByIdAndUpdate', updateDate)
var Product = mongoose.model('Product', ProductSchema)
module.exports = {
    Product
}