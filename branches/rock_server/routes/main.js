var common = require('./common/common.js');
var gcm = require('node-gcm');

var dbc = require('./common/mysql.js');

exports.regist = function(req, res){
	req.body.phoneNumber = req.body.phoneNumber.split('-').join('');
  var data = {
    "phone" : req.body.phoneNumber,
    "regId" : req.body.regId
  };

	dbc.conn.insert('user_phone', data, function(error, info){
		if(error){
			if(error.code == 'ER_DUP_ENTRY'){
				dbc.conn.where({ phone: req.body.phoneNumber })
					.get('user_phone', function(error, results, fields){
						var insertedRegId = results.regId;
						if(insertedRegId == req.body.regId){
							console.log('--------------------------------------');
							console.log('user_phone insert ok');
							console.log('already exists');
							common.makeMessage(res, 'success');
							res.end();
						}else{
							dbc.conn.where({ phone: req.body.phoneNumber })
								.update('user_phone', { regId : req.body.regId}, function(error){
									if(error){
										common.makeMessage(res, 'error', 'db_insert', error.errno, 'DB Insert Error');
										res.end();
									}else{
										console.log('--------------------------------------');
										console.log('user_phone insert ok');
										console.log('update regId');
										common.makeMessage(res, 'success');
										res.end();
									}
							});
						}
				});
			}else{
					common.makeMessage(res, 'error', 'db_insert', error.errno, 'DB Insert Error');
					res.end();
			}
		}else{
			console.log('--------------------------------------');
			console.log('user_phone insert ok');
			console.log('user_phone Data => ');
			console.log(data);
			common.makeMessage(res, 'success');

			res.end();
		}
	});
}

exports.unregist = function(req, res){
	var data = {
		'phone' : req.body.phoneNumber
	}
	dbc.conn.where(data)
		.delete('user_phone', function(error){
			if(error){
				console.log('Delete Error');
				common.makeMessage(res, 'error', 'db_delete', error.errno, "DB Delete Error");
				res.end();
			}else{
				console.log('Delete Ok');
				common.makeMessage(res, 'success');
				res.end();
			}
	});
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
		var sender = new gcm.Sender('AIzaSyB8Pmbktp_SiGOWJ-XwQTvYmE9hNZCDOX8');
//		var sender = new gcm.Sender('AIzaSyD0gTUNasSylOs8-u0NqeDn5NuO08PmGEg');
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
