var message = require('../common/message');
var dbc = require('../common/mysql');

exports.getPhoneInfo = function (data, func){
	if(func == undefined){
		return false;
	}
	dbc.conn.where({ phone: data.phone })
		.get('user_phone', function(error, results, fields){
			func(error, results);
	});
	return true;
}
exports.updatePhoneInfo = function (data, func){
	if(func == undefined){
		return false;
	}
	dbc.conn.where({ phone: data.phone })
		.update('user_phone', data, function(error){
			func(error);
	});
	return true;
}
exports.registPhone = function (data, func){
	if(func == undefined){
		return false;
	}
	dbc.conn
		.insert('user_phone', data, function(error, info){
			func(error, info);
	});
	return true;
}

exports.unregistPhone = function(data, func){
	if(func == undefined){
		return false;
	}

	dbc.conn
		.where({ phone: data.phone })
		.update('user_phone', {del_flag : 'Y'}, function(error){
			func(error);
	});
	return true;
}

exports.checkAccessToken = function(data, func){
	if(func == undefined){
		return false;
	}
	dbc.conn
		.where({phone:data.phone})
		.get("user_phone", function(error, results, fields){
			func(error, results);
	});
	return true;
}
