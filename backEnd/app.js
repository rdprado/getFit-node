var express = require('express');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
var router = express.Router();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

start();

function start() {

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
    injector.inject(router, ()=>{

        console.log("Server ready");

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
            res.send('error');
        });
    });
}

module.exports = app;
