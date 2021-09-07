/**
 * Created by web on 5/24/17.
 **/

var Hapi          = require('hapi');
var corsHeaders   = require('hapi-cors-headers');
var config        = require('config');
var Inert         = require('inert');
const Vision      = require('vision');
const HapiSwagger = require('hapi-swagger');
var pack          = require('./package');
var cluster = require('cluster');
//var models       = require('./src/models/mysql');
var log           = require('./logger/logger');
var numberOfCPUs = require('os').cpus().length;

const options = {
    info: {
        'title': 'Backend Demo API Documentation',
        'version': pack.version
    }
};

var server = new Hapi.Server();

    try {
        if (cluster.isMaster) {
            for (var i = 0; i < numberOfCPUs; i++) {
                var worker = cluster.fork();
                log.info('worker %s started.', worker.id);
            }
        }
        else {
            // create the server
                server.connection({
                    port: config.server.port
                });



            server.register([
                Inert,
                Vision,
                {
                    'register': HapiSwagger,
                    'options': options
                }

            ], function (err) {
                server.route(require('./src/routes/routes'));

                server.start(function (err) {
                    if (err) {
                        log.error(err);
                    } else {
                        log.info('Backend demo server is Running on : ' + server.info.uri);
                    }
                });

                server.on('response', function (request) {
                    if (request.response)
                        log.info(request.info.remoteAddress + ': ' + request.method.toUpperCase() + ' ' + request.url.path + ' --> ' + request.response.statusCode);
                    else
                        log.info("No statusCode : ", request.info.remoteAddress + ': ' + request.method.toUpperCase() + ' ' + request.url.path + ' --> ');
                });
                server.ext('onPreResponse', corsHeaders);
            });
        }
    }
    catch (er) {
        log.error("ERROR : ", er);
    }



var validate = function (decoded, request, callback) {
        return callback(null, true);
};

module.exports = server;