/**
 * Created by web on 11/2/17.
 */

var nodeServer = require('./node_server');
var mongo = require('./db_connections/mongo_connection');
nodeServer.server;
mongo.mongoConnection();

