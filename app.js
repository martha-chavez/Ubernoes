var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');


var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usuariosRouter = require('./routes/usuarios');
var viajesRouter = require('./routes/viajes');

var mongoDB = 'mongodb://127.0.0.1:27017/ubernoes';

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:'ubernoes'}));

//var sess;
//app.post('/loginsesion',(req,res) => {
    //sess = req.session;
    //sess.email = req.body.mail;
    //console.log(sess.email);
    //res.redirect('/viajes/goToAdd');
//});
//app.get('/sesion',(req,res) => {
    //sess = req.session;
    //if(sess.email) {
    //  console.log(sess.email);
        //res.write(`<h1>Hello ${sess.email} </h1><br>`);
      //  res.end('<a href='+'/logout'+'>Logout</a>');
    //}
  //  else {
    //    res.write('<h1>Please login first.</h1>');
  //      res.end('<a href='+'/'+'>Login</a>');
//}
//});
app.get('/logout',(req,res) =>
{
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/');
    });
});

app.use('/', indexRouter);
app.use('/usuarios', usuariosRouter);
app.use('/viajes', viajesRouter);
//BD
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
