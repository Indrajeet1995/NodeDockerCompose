/**
 * Created by web on 11/2/17.
 */
var mongoose = require('mongoose');
var config = require('config');
var log = require('../logger/logger');
mongoose.Promise = global.Promise;


exports.mongoConnection = function () {
    mongoose.connect('mongodb://' + config.database.mongo.host + '/' + config.database.mongo.name, { useMongoClient: true });


    mongoose.connection.on('connected', function () {
        log.info('Mongoose default connection open to ' + 'mongodb://' + config.database.mongo.host + '/' + config.database.mongo.name);
    });

    mongoose.connection.on('error', function (err) {
        log.info('Mongoose default connection error: ' + err);
    });


    mongoose.connection.on('disconnected', function () {
        log.info('Mongoose default connection disconnected');
    });


    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            log.info('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });
};

