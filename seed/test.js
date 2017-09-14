const {
    ActiveCode
} = require('../models/active_code');
const {
    User
} = require('../models/user');
var mongoose = require('mongoose');
mongoose.connect('mongodb://quylkuit:Nguyetheo2302@ds151820.mlab.com:51820/shop-cart')
// var test = ActiveCode({
//     email: "quylk290612@gmail.com",
//     date_expires: "2017-04-07 13:55:23.328Z"
// })
// test.save()
// 
const {
    Testdoc
} = require('../models/testdoc');
// var test_user = {
//     _id: mongoose.Types.ObjectId('58eedcd800f08d196011c1d7'),
//     fullname: 'New Name',
//     phone: 'New Number',
//     password: 'New Password'
// }
// User.findOneAndUpdate({_id: mongoose.Types.ObjectId('58eedcd800f08d196011c1d7')}, {
//     $set: {
//         fullname: 'New Name',
//         phone: 'New Number',
//         password: '123123'
//     }
// }, (err, result) => {
//     if (err) {
//         console.log(err)
//     }
//     console.log(result)
//     console.log("findOneAndUpdate")
// })
// 
// 
// Testdoc.find( { description: { $regex: ".*LINE.*", $options: 'mi' } } ).then(data => {
//     console.log(data)
// })
// 
// 
// ActiveCode.remove({
//     "email": 'quylk29061@gmail.com'
// }, (err, doc) => {
//     if (err) {
//         return console.log(err)
//     }
//     console.log(doc)
// })
// 
// 
// 
const {Feedback} = require('../models/feedback')
var fdb = Feedback({
    email: "req.body.email",
    phone: "req.body.phone",
    name: "req.body.name",
    subject: "req.body.subject",
    message: "req.body.message"
})
fdb.save((err, result) => {
    if (err) {
        console.log(err)
        // return res.send({
        //     alert: 'error',
        //     message: "Something wrong on server"
        // })
    }
    console.log(result)
    // return res.send({
    //     alert: 'success',
    //     message: "It's working"
    // })
})