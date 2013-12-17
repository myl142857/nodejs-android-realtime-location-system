var common = require('./common/common');
var message = require('./common/message');
var gcm = require('./common/gcm');
var token = require('./common/token');

var usermodel = require('./model/usermodel');

exports.regist = function(req, res){
	if(common.isEmpty(req.body.phone_id)){
		message.sendMessage(res, "0001", "phone_id");
		return false;
	}

}
exports.unregist = function(req, res){

}
