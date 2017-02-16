/*jslint this:true, node:true */
'use strict';

var winston = require('winston');

//WINSTON
var logger = new(winston.Logger)({
    transports: [
        new(winston.transports.File)({filename: './logs/log-files.log'}),
        new(winston.transports.Console)({filename: './logs/log-files.log', level: 'error'})
    ]
});

module.exports = {

    info: function (text) {
        logger.info(text);
    },

    error: function (text) {
        logger.error(text);
    }, 

    entering: function (object, method, params) {
        this.info(object + ' in method: ' + method + ' entering with parameters: ' + params);
    }

};