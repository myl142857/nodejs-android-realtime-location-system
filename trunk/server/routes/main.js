var common = require('./common/common.js')

var redis_conn = require('redis');
var redis = redis_conn.createClient();

redis.on('error', function(error){
  consol.log("Error: "+ error);
});


exports.regist = function (req, res) {
  var data = {
    "phoneNumber" : req.body.phoneNumber,
    "regId" : req.body.regId
  };

  var userKey = common.makeUserKey(req.body.phoneNumber);

  redis.hmset(userKey, data, function(error){
    if (error) {
      common.sendError(error, res);
      common.consoleError(error);

      res.end();
    }else{
      common.sendJson("regist ok", res);
      res.end();
    }
  });
}

exports.send = function (req, res) {
	var userKey = common.makeUserKey(req.body.phoneNumber);

	redis.hmgetall(userKey, function(error, data){
		var message = new gcm.Message();
		var sender = new gcm.Sender('AIzaSyB8Pmbktp_SiGOWJ-XwQTvYmE9hNZCDOX8');
		var registrationIds = [];

		for(var i in data){
			registrationIds.push(data[i].regId);
		}
		message.addData("hi", "hello");
		message.collapseKey = 'demo';
		message.delayWhileIdle = true;
		message.timeToLive = 3;

	});
	var message = new gcm.Message();

	sender.send(message, registrationIds, 4, function (err, result) {
			console.log(result);
			res.write("done");
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
