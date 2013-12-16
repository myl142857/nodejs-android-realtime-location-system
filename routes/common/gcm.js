var gcm_module = require('node-gcm');

var API_KEY = 'AIzaSyD2h2Ji79Do0SM9r153c1j3JdDmceP6nRo';
var sender = new gcm_module.Sender(API_KEY);

exports.send = function(to, data){
	if(to == undefined || to.length < 1){
		return false;
	}
	if(data == undefined || data.length < 1){
		return false;
	}

	var message = new gcm_module.Message();

	message.collapseKey = 'nars';
	message.delayWhileIdle = true;
	message.timeToLive = 3;

	for(var i in data){
		message.addData(i, data[i]);
	}
	
	sender.send(message, to, 4, function (err, result){
		if(err){
			console.log(err);
		}
	});
}
