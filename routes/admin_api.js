var express = require('express');
const mongoose = require('mongoose')
var router = express.Router();
var {
    Product
} = require('../models/product')
var {
    User
} = require('../models/user')
router.get('/add-product', isAdmin, function(req, res, next) {
    res.render('admin/add-product', {title : "Add New Product Page"})
});

router.post('/add-product', (req, res, next) => {
    var newProduct = Product({
        user_id: req.user,
        name: req.body.name,
        title_meta: req.body.title_meta,
        price: req.body.price,
        sale: req.body.sale,
        sku: req.body.sku,
        category: req.body.category,
        group: req.body.group,
        description: req.body.description,
        link: req.body.link_item,
        rate: req.body.rate,
        thumbnail: req.body.thumbnail,
        image: req.body.image,
        review: req.body.revie
    })
    newProduct.save((err, doc) => {
        if (err) {
            var data = {
                alert: 'error',
                message: err.errors ? JSON.stringify(err.errors) : err.message
            }
            return res.json(data)
        }
        var data = {
            alert: 'success',
            message: req.body.name + " added successful"
        }
        return res.json(data)
    })
});

module.exports = router;

function isAdmin(req, res, next) {
    if (req.user) {
        console.log(req.user._id)
        User.findOne({
            _id: mongoose.Types.ObjectId(req.user._id),
            roles: 'root'
        }, (err, doc) => {
            if (doc == null) {
                return res.redirect('/users/profile')
            } else {
                return next()
            }  
        })
    }
    else {
        req.session.oldURL = "/admin" + req.url
        console.log(req.url)
        res.redirect('/users/login')
    }
    
}