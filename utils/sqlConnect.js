var mysql = require('mysql');
var config = require('../config');

// make a whole bunch of DB connectinos available
var connect = mysql.createPool({ //changing one connection to pool
  host : config.host,
  port : config.port,
  user : config.user,
  password : config.password,
  database : config.database,
  connectionLimit : 20,
  queueLimit : 100,
  watForConnection : true
});

module.exports = connect;
