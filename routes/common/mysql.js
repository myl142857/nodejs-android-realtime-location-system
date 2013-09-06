var mysql = require('mysql');

var mysqlConfig = {
//	host : "182.162.143.141",
	host : "localhost",
	port : "3306",
	user : "nodejs",
	password : "rlarbfl!@#",
	database : "nodejs"
};

exports.conn = mysql.createConnection(mysqlConfig);
