var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var routes = require('./routes/index');
var books = require('./routes/books');
var borrows = require('./routes/borrows');
var borrowers = require('./routes/borrowers');
var customers = require('./routes/customers');
var app = express();


var parseurl = require('parseurl')
var session = require('express-session')

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 10000 }
}));
//app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

app.use(function (req, res, next) {
  if (!req.session.viewsmm) {
    req.session.viewsmm = {}
    req.session.myuser={}
    req.session.myuser['userid']=0
  }
 
  // get the url pathname
  var pathname = parseurl(req).pathname
 
  // count the views
  req.session.viewsmm[pathname] = (req.session.viewsmm[pathname] || 0) + 1
  
  // var Users = [];
  // var newUser = {UserId: 10};
  //     Users.push(newUser);
  //     req.session.myuser = newUser;
  next()
});
app.get('/foo', function (req, res, next) {
  
  
  res.send('you viewed this page ' + req.session.viewsmm['/foo'] + ' times')
})
app.get('/boo', function (req, res, next) {
  req.session.destroy(function(err) {
    // cannot access session here
  })
  
  res.send('Session Terminated')
})

app.get('/joo', function (req, res, next) {
  res.send('joo ' +req.session.myuser['userid'] + ' times')
})



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/books', books);
app.use('/borrows', borrows);
app.use('/borrowers', borrowers);
app.use('/customers', customers);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
module.exports = app;
