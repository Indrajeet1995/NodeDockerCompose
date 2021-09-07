/**
 * Created by web on 5/24/17.
 **/

var path = require('path');
var fs = require('fs');
var _ = require('underscore');

fs.readdirSync(__dirname).forEach(function (file) {

    /* If its the current file ignore it */
    if (file === 'index.js' ) return;

    /* Prepare empty object to store module */
    var mod = {};

    /* Store module with its name (from filename) */
    mod[path.basename(file, '.js')] = require(path.join(__dirname, file));

    //console.log(mod);

    /* Extend module.exports (in this case - underscore.js, can be any other) */
    _.extend(module.exports, mod);

});

