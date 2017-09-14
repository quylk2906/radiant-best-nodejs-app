const mongoose = require('mongoose');
const config = require('../config/config.json');
mongoose.Promise = global.Promise

// mongoose.connect('mongodb://localhost:27017/shopping')
mongoose.connect('mongodb://' + config.username + ':' + config.password + '@ds151820.mlab.com:51820/shop-cart')

mongoose.connection.on('connected', () => {
    console.log("Conencted to mongoDB");
})

var disconnect = function(){
   mongoose.disconnect()
}

module.exports = {
    mongoose 
}
