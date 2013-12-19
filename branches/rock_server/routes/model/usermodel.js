var message = require('../common/message');
var dbc = require('../common/mysql');

exports.updateUserInfo = function(data, func){
	if(func == undefined){
		return false;
	}
	dbc.conn.where({phone_id : data.phone_id})
		.update('user', data, function(error){
			func(error);
	});
	return true;
}
