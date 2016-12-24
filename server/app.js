'user strict';

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
//const config = require('./conf');

const deployments = require('./rpc');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('cookie-session')({
    secret: 'secret',
    cookie:{maxAge:600000}
}));

const router = express.Router();
router.use('/deployments', deployments.controller);
app.use('/api',router); // all routes goes throw \backend

app.use(express.static(path.join(__dirname, '..')));
//app.use(express.static(path.join(__dirname, '..', '.tmp')));
//app.use('/bower_components',express.static(path.join(__dirname, '..', './bower_components')));
app.use(express.static(path.join(__dirname, '..', 'app')));

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
    app.use((err, req, res/*, next*/) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res/*, next*/) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// general errors will be caught here
process.on('uncaughtException', (err) => {
    console.error('Caught exception: ' + err);
});

module.exports = app;