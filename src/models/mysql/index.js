/**
 * Created by web on 5/24/17.
 **/
var Sequelize     = require('sequelize');
var config        = require('config');
var log           = require('../../../logger/logger');
var fs            = require('fs');

var datamodel        = {};
// initialize database connection

    var sequelize = new Sequelize(
        config.database.mysql.name,
        config.database.mysql.username,
        config.database.mysql.password,
        config.database.mysql.options
    );

    sequelize.authenticate()
        .then(function () {
            log.info("MYSQL : Connected to " + config.database.mysql.name);
        })
        .catch(function (err) {
            log.info('*****************Error while Mysql DB connection**********************');
            log.error(err);
        })
        .done();




// load models
var models = fs.readdirSync(__dirname);

models.forEach(function(model) {
    // Look for all *.js files in the models subdirectory and use the
    // filename as the name of the model object and import it into
    // sequelize.

    var shortName = model.substring(0, model.length - 3);
    if ("." != shortName.substring(0, 1)) {
        if (shortName != "index") {
            //log.debug("loading " + shortName);
            module.exports[shortName] = sequelize.import(__dirname + '/' + model);
            module.exports[shortName].models = datamodel;
            datamodel[shortName] = module.exports[shortName];
        }
    }
});

sequelize.sync();
module.exports.sequelize = sequelize;


