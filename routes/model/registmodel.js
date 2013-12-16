var message = require('../common/message');
var dbc = require('../common/mysql');

exports.registPhone = function (data, res){
	dbc.conn.insert('user_phone', data, function(error, info){
		if(error){
			if(error.code == 'ER_DUP_ENTRY'){
				dbc.conn.where({ phone: data.phone })
					.get('user_phone', function(error, results, fields){
						var insertedRegId = results[0].regId;
						if(insertedRegId == data.regId){
							dbc.conn.where({ phone: data.phone })
								.update('user_phone', {del_flag:"N"}, function(error){
									if(error){
										message.sendMessage(res, '0004', "update_phone_info_del_flag");
									}else{										
										delete data.regId;
										data.phone_id = results[0].id;
										message.sendMessage(res, '0000', data);
									}
								res.end();
								return;
							});
						}else{
							var update_data = {
								regId : data.regId,
								del_flag : 'N',
								access_token : data.access_token
							};
							dbc.conn.where({ phone: data.phone })
								.update('user_phone', update_data, function(error){
									if(error){
										message.sendMessage(res, '0004', "update_phone_info");
									}else{
										delete data.regId;
										data.phone_id = results[0].id;
										message.sendMessage(res, '0000', data);
									}
									res.end();
									return;
							});
						}
				});
			}else{
					message.sendMessage(res, "1001", "insert_phone_info");
					res.end();
					return false;
			}
		}else{
			delete data.regId;
			data.phone_id = info.insertId;
			message.sendMessage(res, "0000", data);
			res.end();
			return true;
		}
	});
}

exports.unregistPhone = function(data, res){
	dbc.conn
		.where({phone:data.phone})
		.get("user_phone", function(error, results, fields){
		if(error){
			message.sendMessage(res, "1000", "get_phone_access_token");
			res.end();
			return false;
		}
		if(results[0].del_flag == 'Y'){
			message.sendMessage(res, "4000", "already_unregisterd");
			res.end();
			return false;
		}
		if(results[0].access_token != data.access_token){
			message.sendMessage(res, "0003", "invalid_access_token");
			res.end();
			return false;
		}
		var mData = {
			'phone' :data.phone
		}

		dbc.conn.where({ phone: mData.phone }).update('user_phone', {del_flag : 'Y'}, function(error){
			if(error){
				message.sendMessage(res, "1003", 'delete_phone_error');
			}else{
				delete mData.regId;
				message.sendMessage(res, "0000", mData);
			}
			res.end();
			return;
		});
	});
}
