/**
 * Created by web on 11/2/17.
 */

var UserModel  = require('../models/mysql');
var User = UserModel.users;

exports.addUser = function (request, reply) {
    var post_data = {};
    if (typeof request.payload == "string") {
        post_data = JSON.parse(request.payload).toLowerCase();
    } else if (typeof request.payload == "object") {
        post_data = JSON.parse(JSON.stringify(request.payload).toLowerCase());
    } else {
        log.error("Unknown body type" + (typeof request.payload));
    }

    post_data['created_at'] = new Date();
    post_data['updated_at'] = new Date();

    User.addUser(post_data, function (result) {
        reply({"message" : "User created successfully!!!", "data" : result});
    }, function (err) {
        reply({"message":err, "data" : null}).code(400);
    });

};

exports.updateUser = function (request, reply) {
    var post_data = {};
    if (typeof request.payload == "string") {
        post_data = JSON.parse(request.payload).toLowerCase();
    } else if (typeof request.payload == "object") {
        post_data = JSON.parse(JSON.stringify(request.payload).toLowerCase());
    } else {
        log.error("Unknown body type" + (typeof request.payload));
    }

    post_data['updated_at'] = new Date();

    User.updateUser(post_data, function (result) {
        reply({"message" : "User updated successfully !!!", "data" : result});
    }, function (err) {
        reply({"message":err, "data" : null}).code(404);
    });

};

exports.deleteUser = function (request, reply) {
    User.deleteUser({user_id : request.params.user_id}, function (result) {
        reply({"message" : "User deleted successfully !!!", "data" : result});
    }, function (err) {
        reply({"message":err, "data" : null}).code(404);
    });

};

exports.listUsers = function (request, reply) {

    User.listUsers({},function (result) {
        reply({"message" : "Found !!!", "data" : result});
    }, function (err) {
        reply({"message":err, "data" : null}).code(400);
    });

};
