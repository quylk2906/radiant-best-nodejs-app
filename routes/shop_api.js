var express = require('express');
const mongoose = require('mongoose')
var router = express.Router();
var {
    Product
} = require('../models/product')
var Cart = require('../models/cart')
var {
    Order
} = require('../models/order')
/* GET users listing. */
router.get('/', function(req, res, next) {
    const products = Product.find((err, docs) => {
        if (err) return res.send(err)
        var productChunks = []
        var chunkSize = 3
        var count = 0
        docs.forEach(function(item, index) {
            if (item.category == 'html') count++;
        })
        // for (var i = 0; i < docs.length; i += chunkSize) {
        //     productChunks.push(docs.slice(i, i + chunkSize))
        // }
        res.render('shop/index', {
            isShop: true,
            products: docs,
            total: docs.length,
            totalHTML: count,
            totalWP: docs.length - count,
            title: "Shop Page"
        })
    })
});
router.get('/category/:cate', function(req, res, next) {
    var itemCate = []
    var cate = req.params.cate
    const products = Product.find((err, docs) => {
        if (err) return res.send(err)
        docs.forEach(item => {
            if (item.category == cate) {
                itemCate.push(item)
            }
        })
        res.render('shop/shop-category', {
            isShop: true,
            total: docs.length,
            totalHTML: cate == "html" ? itemCate.length : docs.length - itemCate.length,
            totalWP: cate == "html" ? docs.length - itemCate.length : itemCate.length,
            isHTML: cate == "html" ? true : false,
            isWP: cate == "wordpress" ? true : false,
            products: itemCate,
            title: "Category Product"
        })
    })
})
router.get('/search-result/by-name/', function(req, res, next) {
    res.render('shop/search-result', {
        isShop: true,
        keyword: "",
        title: "Search by name"
    })
})
router.post('/search-result/by-name/', function(req, res, next) {
    Product.find({
        name: {
            $regex: ".*" + req.body.keyword + ".*",
            // $regex:  /.*req.body.keyword.*/,
            $options: 'mi'
        }
    }).then(data => {
        res.render('shop/search-result', {
            isShop: true,
            total: data.length,
            keyword: req.body.keyword,
            products: data,
            title: "Search by name"
        })
    })
})
router.post('/get-item', function(req, res, next) {
    console.log(req.body.id)
    Product.findById({
        _id: mongoose.Types.ObjectId(req.body.id)
    }).then(data => {
        res.send(data)
    })
})
router.get('/check-out', isLoggedIn, function(req, res, next) {
    var cart = req.session.cart;
    if (!cart) {
        return res.render('shop/check-out', {
            products: null,
            title: "Checkout Page"
        })
    }
    // 
    res.render('shop/check-out', {
        total: cart.totalPrice,
        products: cart.items
    })
});
router.get('/shop1', function(req, res, next) {
    res.render('shop/index1', {
        isShop: true,
        layout: false
    })
});
router.get('/cart', function(req, res, next) {
    if (!req.session.cart) {
        return res.render('shop/cart', {
            products: null,
            title: "Cart Page"
        })
    }
    var cart = new Cart(req.session.cart)
    res.render('shop/cart', {
        products: Object.keys(cart.generateArray()).length === 0 ? null : cart.generateArray(),
        totalPrice: cart.totalPrice,
        isShop: true
    })
});
router.post('/add-to-cart/', function(req, res, next) {
    const productID = req.body.id
    console.log(productID)
    var cart = new Cart(req.session.cart ? req.session.cart : {})
    Product.findById(productID, (err, docs) => {
        if (err) {
            return res.send({
                message: 'error',
                status: false
            })
        }
        cart.add(docs)
        req.session.cart = cart
        res.send(cart)
    })
    // res.send('/shop')
});
router.post('/delete-item/:id', function(req, res, next) {
    const productID = req.params.id
    var cart = new Cart(req.session.cart ? req.session.cart : {})
    cart.removeByOne(productID)
    req.session.cart = cart
    res.send(cart)
});
router.get('/item-details/:category/:meta', function(req, res, next) {
    Product.findOne({
        title_meta: req.params.meta
    }).then(pro => {
        Product.find({
            category: req.params.category
        }).limit(5).then(pro_related => {
            res.render('shop/shop-detail', {
                product: pro,
                product_related: pro_related,
                isShop: true,
                title: "Item Details Page"
            })
        })
    })
});
router.get('/shop-item', function(req, res, next) {
    res.render('shop/shop-item', {
        isShop: true,
        title: "Item Details Page"
    })
});
router.post('/check-out', function(req, res, next) {
    if (!req.session.cart) {
        return res.render('shop/checkout')
    }
    var newOrder = Order({
        user_id: req.user,
        cart: req.session.cart,
        organization: req.body.organization,
        company: req.body.billing_form_companyname,
        purpose: req.body.purpose_form_message,
        total: req.body.total
    })
    newOrder.save(() => {
        req.flash('success', 'Successfully bougth products')
        req.session.cart = null
        res.redirect('/shop')
    })
});
module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    req.session.oldURL = "/shop" + req.url
    res.redirect('/users/login')
}