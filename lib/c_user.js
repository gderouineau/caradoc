/*
 * Importation of mysql data
 */

var mysql = require('./mysql');
var Sequelize = mysql.Sequelize;
var sequelize = mysql.sequelize;


/*
 * Definition of the user object
 */

exports.User ={

    User : sequelize.define("user", {
        //id
        username   : {
            type : Sequelize.STRING,
            allowNull : false
        },
        firstname   : {
            type : Sequelize.STRING
        },
        lastname    : {
            type : Sequelize.STRING
        },
        password    : {
            type : Sequelize.STRING,
            allowNull : false
        },
        email       : {
            type : Sequelize.STRING,
            allowNull : false
        },
        role        : {
            type : Sequelize.STRING,
            allowNull : false
        }


        // updatedat
        // createdat
    })};

