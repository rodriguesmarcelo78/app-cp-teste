'use strict';

var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon'); //unused yet
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var user = require('./routes/user.routes');
var arquivo = require('./routes/arquivo.routes');
var rating = require('./routes/rating.routes');
var noticia = require('./routes/noticia.routes');
var devices = require('./routes/devices.routes');
var cors = require('cors');
var loggerUtil = require('./util/logger-util');
var mongoose = require("mongoose");
var database = require('./config/database.json');
var app = express();

//MONGOOSE
var mongoURL = (process.env.MONGODB_URL || database.development.mongoURL);
mongoose.connect(mongoURL);

var db = mongoose.connection;
db.on('error', function (callback) {
    loggerUtil.error("Error connecting into mongodb: " + callback);
});
db.once('open', function () {
    loggerUtil.info("MongoDB - Connection successfully");
    //Start JWT Strategy
    //passport.use(new JwtStrategy(jwtSettings.options, function(ignore, done) {
    //    done(null, true);
    //}));
});


// view engine setup
app.set("view options", {layout: false});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json({limit: '80mb'}));
app.use(bodyParser.urlencoded({limit: '80mb', extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ----------------- ROUTES ----------------- //
app.use('/user', user);
app.use('/arquivo', arquivo);
app.use('/rating', rating);
app.use('/noticia', noticia);
app.use('/devices', devices);

app.all('/*', function (req, res, next) {
    console.log('Passou aqui');
    res.sendFile(__dirname + '/public/index.html');
});


module.exports = app;
