var common = require('./common/common');
var message = require('./common/message');
var gcm = require('./common/gcm');
var token = require('./common/token');

var registmodel = require('./model/registmodel');

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

	var access_token = token.getAccessToken(req.body.phoneNumber, req.body.regId);

  var data = {
    "phone" : req.body.phoneNumber,
    "regId" : req.body.regId,
		"access_token" : access_token
  };

	if(!common.isEmpty(req.body.os_version)){
		data.os_version = req.body.os_version;
	}
	if(!common.isEmpty(req.body.model_name)){
		data.model_name = req.body.model_name;
	}

	registmodel.registPhone(data, res);
}

exports.unregist = function(req, res){
	if(req.body.phoneNumber == undefined){
		message.sendMessage(res, "0001", "phoneNumber");
		return false;
	}
	var phoneNumber = req.body.phoneNumber;
	var makePhoneResult = common.makePhoneNumber(phoneNumber);

	if(makePhoneResult.status != "0000"){
		message.sendMessage(res, makePhoneResult.status, "phoneNumber");
		return false;
	}
	if(req.body.access_token == undefined){
		message.sendMessage(res, "0003", "access_token");
		return false;
	}

	var data = {
		'phone' : makePhoneResult.data,
		'access_token' : req.body.access_token
	}

	registmodel.unregistPhone(data, res);
}

/*
redis.on('error', function(error){
  console.log("Error: "+ error);
});


exports.regist = function (req, res) {
}

exports.unregist = function (req, res){
	var data = {
		"phoneNumber" : req.body.phoneNumber,
		"regId" : req.body.regId
	};

	var userKey = common.makeUserKey(data.phoneNumber);
	if(!userKey){
		common.consoleError("phoneNumber is null");
		res.end();
		return;
	}

	redis.hdel(userKey, data, function(error){
		if(error){
			common.sendError(error, res);
			common.consoleError(error);
		}else{
			common.sendJson("unregist ok", res);
		}

		res.end();
	});
}

exports.send = function (req, res) {
	var userKey = common.makeUserKey(req.params.phoneNumber);

	redis.hgetall(userKey, function(error, data){
		var message = new gcm.Message();
		var sender = new gcm.Sender('AIzaSyD2h2Ji79Do0SM9r153c1j3JdDmceP6nRo');
//		var sender = new gcm.Sender('AIzaSyD2h2Ji79Do0SM9r153c1j3JdDmceP6nRo');
		var registrationIds = [];

		registrationIds.push(data.regId);
		message.addData("hi", "hello");
		message.collapseKey = 'demo';
		message.delayWhileIdle = true;
		message.timeToLive = 3;

		sender.send(message, registrationIds, 4, function (err, result) {
				console.log(result);
				res.write("done");
				res.end();
		});
	});
}
exports.location = function(req, res){
	var data = {
		"location" : req.body.location
	};

  var userKey = common.makeUserKey(req.body.phoneNumber);
	if(!userKey){
		common.consoleError("phoneNumber is null");
		res.end();
		return;
	}

  redis.hmset(userKey, data, function(error){
    if (error) {
      common.sendError(error, res);
      common.consoleError(error);
    }else{
      common.sendJson("save location", res);
			console.log(data.location);
    }
    res.end();
  });
}

exports.get_user = function(req, res){
  var phoneNumber = req.params.phoneNumber;
  if(!phoneNumber){
    common.sendError("phoneNumber is Empty", res);
    res.end();
    return;
  }
  var userKey = common.makeUserKey(phoneNumber);
  redis.hgetall(userKey, function(error, results){
    if(error){
      common.sendError(error, res);
      common.consoleError(error);
    }else{
      common.sendJson(results, res);
      console.log(results);

      res.end();
    }
  });
}
*/
