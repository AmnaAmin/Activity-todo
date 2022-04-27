
const express = require('express');
const createError = require('http-errors');
const activityRouters = require('./routes/activityRouter');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/activity', activityRouters);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {

    // render the error page
    res.status(err.status || 500).send({
        message: err.message,
        data: {}
    });

});

module.exports = app;
