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
exports.registUser = function(data, func){
	if(func == undefined){
		return false;
	}

	dbc.conn
		.insert('user', data, function(error, info){
			func(error, info);
	});
	return true;
}
exports.unregistUser = function(data, func){
	if(func == undefined){
		return false;
	}

	dbc.conn
		.where({ email: data.userEmail})
		.update('user', {del_flag:'Y'}, function(error){
			func(error);
	});
	return true;
}
exports.getUserPhone = function(data, func){
	if(func == undefined){
		return false;
	}

	dbc.conn
		.select('user.alias, user.del_flag user_del_flag, user_phone.access_token, user_phone.id phone_id, user_phone.phone')
		.join('user_phone', 'user_phone.id = user.phone_id', 'INNER')
		.where({'user.email':data.userEmail})
		.get('user', function(error, results, fields){
			func(error, results);
	});
	return true;
}
