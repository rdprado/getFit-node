var express = require('express');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient
var assert = require('assert');

var app = express();
var router = express.Router();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Connection URL
var url = 'mongodb://localhost:27017/mydb';
MongoClient.connect(url, function(err, database) {
  assert.equal(null, err);

  var db = database;
  start(db);
});

function start(db) {
    /* GET home page. */
    router.get('/', function(req, res, next) {
        //res.render('index', { title: 'Express' });
    });

    /* GET hello page. */
    router.get('/helloworld', function(req, res, next) {
        //res.render('helloworld', { title: 'Hello, World!' });
    });

    // Custom routes
    var injector = require('./injector')
    injector.inject(router, db);

    app.use(router);

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
}

module.exports = app;
