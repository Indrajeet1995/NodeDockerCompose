/**
 * Created by web on 11/2/17.
 */

"use strict"

var mongoose = require('mongoose');
var Schema = mongoose.Schema;





var users = new Schema({
    user_id: {type : String},
    first_name : {type : String, required : true},
    last_name : {type : String, required : true},
    project_id : {type : Number, required : true},
    created_at : {type : Date},
    updated_at : {type : Date},
    is_active : {type : Number, default : 1}
}, {strict: false });

exports.User = mongoose.model('User',users, 'users');
