/**
 * Created by web on 5/24/17.
 **/

var log       = require('../../logger/logger');
var config        = require('config');
var Joi = require('joi');
var userFactory = require('../factory/mongo_user_factory');
exports.start = {
    auth : false,
    handler : function (request, reply) {

        reply("DiCD working!!!");
    }
};

exports.addUser  = {
    description: 'Add new user',
    notes: 'Adds new user. user_id is unique',
    tags: ['api'],
    plugins: {
        'hapi-swagger': {
            responses: {
                '200': {'description': 'Success'},
                '201': {'description': 'Success'},
                '400': {'description': 'Bad Request'},
                '403': {'description': 'Forbidden'},
                '409': {'description': 'Conflict'}
            }
        }
    },
    validate : {
        payload: {
            user_id: Joi.number().required().example(1),
            first_name: Joi.string().required().example('first_name'),
            last_name: Joi.string().required().example('last_name'),
            project_id: Joi.number().required().example(1),
            is_active : Joi.number().example(1).description('1 for active')

        }
    },
    handler : function (request, reply) {
        log.info(request.info);
        userFactory.addUser(request, reply);
    }
};

exports.updateUser  = {
    description: 'Add new user',
    notes: 'Update new user.',
    tags: ['api'],
    plugins: {
        'hapi-swagger': {
            responses: {
                '200': {'description': 'Success'},
                '201': {'description': 'Success'},
                '400': {'description': 'Bad Request'},
                '403': {'description': 'Forbidden'},
                '409': {'description': 'Conflict'}
            }
        }
    },
    validate : {
        payload: {
            user_id: Joi.number().required().example(1),
            first_name: Joi.string().example('first_name'),
            last_name: Joi.string().example('last_name'),
            project_id: Joi.number().example(1),
            is_active : Joi.number().example(1).description('1 for active')

        }
    },
    handler : function (request, reply) {
        log.info(request.info);
        userFactory.updateUser(request, reply);
    }
};


exports.deleteUser  = {
    description: 'Delete user',
    notes: 'Deletes user.',
    tags: ['api'],
    plugins: {
        'hapi-swagger': {
            responses: {
                '200': {'description': 'Success'},
                '201': {'description': 'Success'},
                '400': {'description': 'Bad Request'},
                '403': {'description': 'Forbidden'},
                '409': {'description': 'Conflict'}
            }
        }
    },
    validate : {
        params: {
            user_id: Joi.number().required().example(1)
        }
    },
    handler : function (request, reply) {
        log.info(request.info);
        userFactory.deleteUser(request, reply);
    }
};

exports.listUsers  = {
    description: 'List users',
    notes: 'Lists users.',
    tags: ['api'],
    plugins: {
        'hapi-swagger': {
            responses: {
                '200': {'description': 'Success'},
                '201': {'description': 'Success'},
                '400': {'description': 'Bad Request'},
                '403': {'description': 'Forbidden'},
                '409': {'description': 'Conflict'}
            }
        }
    },
    validate : {
    },
    handler : function (request, reply) {
        log.info(request.info);
        userFactory.listUsers(request, reply);
    }
};


