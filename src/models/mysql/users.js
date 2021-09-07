/**
 * Created by web on 11/2/17.
 */


"use strict";
var log                 = require('../../../logger/logger');
var User;

module.exports = function(sequelize, DataTypes) {
    User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull : false
        },

        first_name: {
            type : DataTypes.STRING
        },
        last_name: {
            type : DataTypes.STRING
        },
        project_id: {
            type : DataTypes.INTEGER
        },
        is_active : {
            type : DataTypes.INTEGER,
            defaultValue : 1
        },

        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE
    }, {
        tableName: "users",
        timestamps: false,
        underscored: true,
        classMethods: {

            addUser : function (data, success, error) {
                try {
                    var condition = {
                       user_id : data.user_id
                    };

                    this.build(data);
                    this.findOrCreate({
                            where: condition,
                            defaults : data
                        })
                        .spread(function(user_data, created) {
                            if(created) {
                                success(user_data);
                            } else {
                                error("User already present");
                            }
                        }).catch(error);
                }catch (err) {
                    log.error("ERROR : ", err);
                    error(err);
                }
            },


            updateUser : function (data, success, error) {
                try {

                    User.findOne({
                        where : {user_id : data.user_id}
                    }).then(function (user) {
                        if(user) {
                            user.updateAttributes(data)
                                .then(success)
                                .catch(error);
                        } else {
                        error("User not found");
                        }
                    }).catch(function (err) {
                        error(err)
                    });

                }catch (err) {
                    log.error("ERROR : ", err);
                    error(err);
                }
            },


            listUsers : function (params, success, error) {

                User.findAndCountAll({}).then(function (result) {
                    success(result);

                }).catch(function (err) {
                    log.error("ERROR : ", err);
                    error(err);
                })
            },



            deleteUser : function (condition, success, failure) {
                User.destroy(
                    {
                        where : condition
                    })
                    .then(success)
                    .catch(failure);
            }
        }
    });
    return User;
};



