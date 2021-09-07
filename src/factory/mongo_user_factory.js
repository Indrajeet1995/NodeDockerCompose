/**
 * Created by web on 11/2/17.
 */
var UserModel  = require('../models/mongo/users');
var User = UserModel.User;

exports.addUser = function (request, reply) {
    var post_task = {};
    if (typeof request.payload == "string") {
        post_task = JSON.parse(request.payload).toLowerCase();
    } else if (typeof request.payload == "object") {
        post_task = JSON.parse(JSON.stringify(request.payload).toLowerCase());
    } else {
        log.error("Unknown body type" + (typeof request.payload));
    }

    post_task['created_at'] = new Date();
    post_task['updated_at'] = new Date();

    User.findOne({user_id : post_task.user_id}, function (err, result) {
        if(err) {
            reply(err).code(400);
        } else {
            if(result) {
                reply("This user_id already present").code(409);
            } else {
                var new_user = new User(post_task);
                new_user.save(function (err, docs) {
                    if (err) {
                        reply(err).code(400);
                    } else {
                        reply({"message" : "User created successfully!!!", "data" : docs});
                    }
                })
            }

        }
    });

};

exports.updateUser = function (request, reply) {
    var post_task = {};
    if (typeof request.payload == "string") {
        post_task = JSON.parse(request.payload).toLowerCase();
    } else if (typeof request.payload == "object") {
        post_task = JSON.parse(JSON.stringify(request.payload).toLowerCase());
    } else {
        log.error("Unknown body type" + (typeof request.payload));
    }

    post_task['updated_at'] = new Date();

    User.findOneAndUpdate({user_id : post_task.user_id}, post_task,{new : true}, function (err, result) {
        if(err) {
            reply(err).code(400);
        } else {
            if(result) {
                reply({"message" : "User updated successfully !!!", "data" : result});
            } else {
                reply({"message" : "User not found !!!", "data" : result}).code(404);
            }


        }
    });

};

exports.deleteUser = function (request, reply) {

    User.findOneAndRemove({user_id : request.params.user_id}, function (err, result) {
        if(err) {
            reply(err).code(400);
        } else {
            if(result) {
                reply({"message" : "User deleted successfully !!!", "data" : result});
            } else {
                reply({"message" : "User not found !!!", "data" : result}).code(404);
            }
        }
    });

};

exports.listUsers = function (request, reply) {

    User.find(function (err, result) {
        if(err) {
            reply(err).code(400);
        } else {
            if(result) {
            reply({"message" : "Found !!!", "data" : result});
            } else {
                reply({"message" : "No data found !!!", "data" : result}).code(404);
            }
        }
    });

};
