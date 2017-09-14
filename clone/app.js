const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const passport = require('passport')
const port = process.env.PORT || 3000

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'public'))

app.use('/assets/css', express.static(__dirname + '/css'))
app.use('/assets/js', express.static(__dirname + '/js'))
app.use('/assets/image', express.static(__dirname + '/image'))

app.get('', (req, res) => {
   res.render('index')
})

app.listen(port, () => {
    console.log("Server start at " + port);
})
