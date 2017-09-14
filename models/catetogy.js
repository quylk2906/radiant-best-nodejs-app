const mongoose = require('mongoose');
const config = require('../config/config.json')

const CategorySchema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    name_meta: {
      type: String,
      trim: true,
      required: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

// CategorySchema.pre('save', function(next) {
//    var self = this;
//    self.created_at = new Date();
//    next()
// })

var updateDate = function(next) {
    var self = this;
    self.updated_at = new Date();
    if (!self.created_at) {
        self.created_at = now;
    }
    next()
}

CategorySchema.pre('update', updateDate)
    .pre('findOneAndUpdate', updateDate)
    .pre('findByIdAndUpdate', updateDate)



var Category = mongoose.model('Category', CategorySchema)

module.exports = {
    Category
}
