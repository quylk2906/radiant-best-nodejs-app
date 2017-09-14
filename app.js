var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/home_api');
var users = require('./routes/users_api');
var shop = require('./routes/shop_api');
var admin = require('./routes/admin_api')
var portfolio = require('./routes/portfolio_api');
var blog = require('./routes/blog_api');
var dateFormat = require('dateformat');

const expressHbs = require('express-hbs');
const flash = require('connect-flash');
const passport = require('passport');
const session = require('express-session');
const validator = require('express-validator');
const mongoStore = require('connect-mongo')(session);
const {
    mongoose
} = require('./database/mongoose');

var {
    Product
} = require('./models/product')
var app = express();

// view engine setup
// hbs.registerPartials(__dirname + '/views/partials');
// hbs.registerLayouts(__dirname + '/layouts/layout');
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', expressHbs.express4({
    partialsDir: __dirname + '/views/partials',
    defaultLayout: __dirname + '/views/layouts/layout',
    extname: '.hbs',
    beautify: true
}));
expressHbs.registerHelper('times', function(n, text) {
    var accum = '';
    for (var i = 0; i < n; ++i)
        accum += text
    return accum;
});
expressHbs.registerHelper('formatDate', function(date) {
     var now = new Date(date);
     return dateFormat(now);
});
expressHbs.registerHelper('sliceString', function(text, rangeSlice) {
     return text.slice(0, rangeSlice) + ' ...'
});


app.use('/assets/css', express.static(__dirname + '/public/stylesheets'))
app.use('/assets/fonts', express.static(__dirname + '/public/fonts'))
app.use('/assets/js', express.static(__dirname + '/public/javascripts'))
app.use('/assets/include', express.static(__dirname + '/public/include'))
app.use('/assets/magazine', express.static(__dirname + '/public/magazine'))
app.use('/assets/images', express.static(__dirname + '/public/images'))
require('./config/passport')
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: false,
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    }),
    cookie: {
        maxAge: 180 * 60 * 1000
    }
}))
app.use(validator())
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    Product.aggregate({$sample: {size: 1}}).then(doc1=>{
        Product.aggregate({$sample: {size:3}}).then(doc3=>{
            res.locals.login = req.isAuthenticated()
            res.locals.session = req.session
            res.locals.doc1 = doc1[0]
            res.locals.doc3 = doc3
            next()
        })
    })
    
})


app.use('/', index);
app.use('/users', users);
app.use('/shop', shop);
app.use('/blog', blog);
app.use('/admin', admin)
app.use('/portfolio', portfolio);

app.get('*', function(req, res) {
    res.render('common/page-not-found', {
        title: '404 Error'
    })
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
