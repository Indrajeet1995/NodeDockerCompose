/**
 * Created by web on 5/24/17.
 **/

var mongoController = require('../controller/mongo_controller');
var mysqlController = require('../controller/mysql_controller');

module.exports = [
    { method: 'GET', path: '/', config: mongoController.start },
    { method: 'GET', path: '/mongo/user', config: mongoController.listUsers },
    { method: 'POST', path: '/mongo/user', config: mongoController.addUser },
    { method: 'PUT', path: '/mongo/user', config: mongoController.updateUser },
    { method: 'DELETE', path: '/mongo/user/{user_id}', config: mongoController.deleteUser },

    { method: 'GET', path: '/mysql/user', config: mysqlController.listUsers },
    { method: 'POST', path: '/mysql/user', config: mysqlController.addUser },
    { method: 'PUT', path: '/mysql/user', config: mysqlController.updateUser },
    { method: 'DELETE', path: '/mysql/user/{user_id}', config: mysqlController.deleteUser }
];

