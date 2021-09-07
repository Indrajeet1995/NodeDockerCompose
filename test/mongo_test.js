process.env.NODE_ENV = 'test';

const Code = require('code');
var   Lab  = require("lab");
var fs     = require('fs');
var server     = require('../node_server');
var mongo = require('../db_connections/mongo_connection');
mongo.mongoConnection();

var lab = exports.lab = Lab.script();
lab.experiment("DiCD_mongo_tests", function() {

    /*var image = {
     name: 'Ren & Stimpy',
     filename: 'unix.jpg',
     checksum: '5965ae98ecab44a2a29b87f90c681229',
     width: 256,
     height: 256,
     filedata: fs.readFileSync('unix.jpg')
     };
     var payload = {
     file : 'unix.jpg'
     };*/

    // test 0
    lab.test("POST Add new user", function(done) {
        var options = {
            method: "POST",
            url: "/mysql/user",
            "payload" : {
                "user_id" : 1,
                "first_name" : "sudhir",
                "last_name" : "raut",
                "project_id" : "1"
            }
        };

        server.inject(options, function(response) {
            var result = response.result;
            Code.expect(result).to.be.instanceof(Object);
            done();
        });
    });

    // test 1
    lab.test("Get users", function(done) {
        var options = {
            method: "GET",
            url: "/mysql/user"
        };

        server.inject(options, function(response) {
            var result = response.result;
            Code.expect(result).to.be.instanceof(Object);
            done();
        });
    });

    // test 2



});
