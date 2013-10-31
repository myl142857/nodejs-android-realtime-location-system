var mysql = require('mysql-activerecord');

exports.conn = new mysql.Adapter({
	server : 'localhost',
	username : 'nodejs',
	password : 'rlarbfl!@#',
	database : 'nodejs'
});
