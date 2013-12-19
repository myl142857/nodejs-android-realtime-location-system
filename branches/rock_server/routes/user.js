var common = require('./common/common');
var message = require('./common/message');
var gcm = require('./common/gcm');
var token = require('./common/token');

var usermodel = require('./model/usermodel');

exports.regist = function(req, res){
	if(common.isEmpty(req.body.phoneNumber)){
		message.sendMessage(res, "0001", "phoneNumber");
		return false;
	}
	var phoneNumber = req.body.phoneNumber;
	var makePhoneResult = common.makePhoneNumber(phoneNumber);

	if(makePhoneResult.status != "0000"){
		message.sendMessage(res, makePhoneResult.status, "phoneNumber");
		return false;
	}

	req.body.phoneNumber = makePhoneResult.data;

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


	var access_token = token.getAccessToken(req.body.phoneNumber, req.body.regId);
	var userPass = token.getPassword(req.body.userEmail, req.body.userPass, access_token);

  var phoneData = {
    "phone" : req.body.phoneNumber,
    "regId" : req.body.regId,
		"access_token" : access_token,
		"del_flag" : "N"
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
	registPhone(userData, phoneData, res);
}
exports.unregist = function(req, res){

}

exports.registUser = function(userData, phoneData, res){
	usermodel.registUser(userData, function(error, info){
		if(error){
			if(error.code == 'ER_DUP_ENTRY'){
				usermodel.updateUserInfo(userData, function(error){
					if(error){
						message.sendMessage(res, '0004', 'update_user_info_del_flag');
					}else{
						message.sendMessage(res, '0000', phoneData);
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

exports.registPhone = function(userData, phoneData, res){
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
							message.sendMessage(res, '0004', "update_phone_info_del_flag");
						}else{										
							delete phoneData.regId;
							userData.phone_id = results[0].id;

							registUser(userData, phoneData, res);
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
		}
	});
}
