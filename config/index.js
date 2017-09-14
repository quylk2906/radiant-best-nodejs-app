const configValue = require('./config')

module.exports = {
   getConnectionStringOnline(){
      return "mongolab://"
   }
   getConnectionStringLocal(){
      return "mongodb://localhost:27017/ShopCart"
   }
}
