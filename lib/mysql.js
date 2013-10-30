var params = require('../../../config/params/db');

var Sequelize = require('sequelize');

exports.Sequelize = Sequelize;

var storagePath = "";
if(params.data.dialect == "sqlite")
    storagePath = params.data.dialect;


exports.sequelize =  new Sequelize(params.data.db, params.data.user, params.data.pass, {
    host   : params.data.host,
    dialect: params.data.dialect,
    maxConcurrentQueries: 100,
    storage : storagePath,

    pool: {
        maxConnections: 100,
        maxIdleTime: 5
    },

    define: {

    }
});