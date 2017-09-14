module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {}
    this.totalQty = oldCart.totalQty || 0
    this.totalPrice = oldCart.totalPrice || 0

    this.add = (item) => {
        var storedItem = this.items[item._id]
        if (!storedItem) {
            storedItem = this.items[item._id] = {
                item: item,
                qty: 0,
                price: 0
            }
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalPrice += storedItem.item.price;
        this.totalQty++;
    }

    this.update = (item, qty) => {
        var storedItem = this.items[id];
        this.totalQty -= storedItem.qty;
        storedItem.qty = qty;
        storedItem.price = storedItem.item.price * storedItem.item.qty;
        this.totalPrice += storedItem.item.price;
        this.totalQty += qty;
    }

    this.generateArray = function() {
        //   var array = []
        //   console.log(this.items);
        //   for (var id in this.items) {
        //       array.push(this.items[id])
        //   }
        return this.items
    }

    this.removeByOne = function(id) {
        this.totalQty -= this.items[id].qty
        this.totalPrice -= this.items[id].price
        delete this.items[id]
    }

    // this.removeAll = function(id) {
    //     this.totalQty -= this.items[id].qty
    //     this.totalPrice -= this.items[id].price
    //     delete this.items[id]
    // }
}
