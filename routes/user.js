var common = require('./common/common');
var message = require('./common/message');
var gcm = require('./common/gcm');
var token = require('./common/token');

var usermodel = require('./model/usermodel');
var phonemodel = require('./model/phonemodel');

exports.regist = function(req, res){
	if(common.isEmpty(req.body.phoneNumber)){
		message.sendMessage(res, "0001", "phoneNumber");
		return false;
	}
	if(common.isEmpty(req.body.regId)){
		message.sendMessage(res, "0001", "regId");
	}

	if(common.isEmpty(req.body.userEmail)){
		message.sendMessage(res, "0001", "userEmail");
		return false;
	}

	if(common.isEmpty(req.body.userPass)){
		message.sendMessage(res, "0001", "userPass");
		return false;
	}

	var phoneNumber = req.body.phoneNumber;
	var makePhoneResult = common.makePhoneNumber(phoneNumber);

	if(makePhoneResult.status != "0000"){
		message.sendMessage(res, makePhoneResult.status, "phoneNumber");
		return false;
	}

	req.body.phoneNumber = makePhoneResult.data;


	var access_token = token.getAccessToken(req.body.phoneNumber, req.body.regId);
	var userPass = token.getPassword(req.body.userEmail, req.body.userPass, access_token);

  var phoneData = {
    "phone" : req.body.phoneNumber,
    "regId" : req.body.regId,
		"access_token" : access_token
  };

	var userData = {
		"email" : req.body.userEmail,
		"pass" : userPass,
		"del_flag" : "N"
	};

	if(!common.isEmpty(req.body.os_version)){
		phoneData.os_version = req.body.os_version;
	}
	if(!common.isEmpty(req.body.model_name)){
		phoneData.model_name = req.body.model_name;
	}
	if(!common.isEmpty(req.body.alias)){
		userData.alias = req.body.alias;
	}
	registPhone(userData, phoneData, res);
}
exports.unregist = function(req, res){
	if(common.isEmpty(req.body.userEmail)){
		message.sendMessage(res, "0001", "userEmail");
		return false;
	}
	if(common.isEmpty(req.body.access_token)){
		message.sendMessage(res, "0001", "access_token");
		return false;
	}

	var data = {
		userEmail:req.body.userEmail
	};

	usermodel.getUserPhone(data, function(error, results){
		if(error){
			message.sendMessage(res, "1000", "getUserPhone");
			return false;
		}else{
			if(!token.checkAccessToken(results[0]['access_token']){
				message.sendMessage(res, '0003', "access_token");
				return false;
			}
			if(results[0]['user_del_flag'] == 'Y'){
				message.sendMessage(res, '4000', 'user_unregisterd');
				return false;
			}else{
				usermodel.unregistUser(data, function(error){
					if(error){
						message.sendMessage(res, "1002", "unregistUser");
						return false;
					}else{
						message.sendMessage(res, "0000");
						return true;
					}
				});
			}
		}
	});
}

var registPhone = function(userData, phoneData, res){
	phonemodel.registPhone(phoneData, function(error, info){
		if(error){
			if(error.code == 'ER_DUP_ENTRY'){
				phonemodel.getPhoneInfo(phoneData, function(error, results){
					if(results.length == 0){
						message.sendMessage(res, "0002", "regId");
						return false;
					}
					phonemodel.updatePhoneInfo(phoneData, function(error){
						if(error){
							message.sendMessage(res, '0004', "update_phone_info");
							return false;
						}else{										
							delete phoneData.regId;
							userData.phone_id = results[0].id;
							registUser(userData, phoneData, res);
							return true;
						}
					});
				});
			}else{
					message.sendMessage(res, "1001", "insert_phone_info");
					return false;
			}
		}else{
			delete phoneData.regId;
			userData.phone_id = info.insertId;
			registUser(userData, phoneData, res);
			return true;
		}
	});
}

var registUser = function(userData, phoneData, res){
	usermodel.registUser(userData, function(error, info){
		if(error){
			if(error.code == 'ER_DUP_ENTRY'){
				usermodel.updateUserInfo(userData, function(error){
					if(error){
						message.sendMessage(res, '0004', 'update_user_info_del_flag');
						return false;
					}else{
						message.sendMessage(res, '0000', phoneData);
						return true;
					}
					return;
				});
			}else{
				message.sendMessage(res, '1001', "insert_user_info");
				return false;
			}
		}else{
			message.sendMessage(res, '0000', phoneData);
			return true;
		}
	});
}
