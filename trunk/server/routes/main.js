var gcm = require('node-gcm');
var redis = require('redis');
var client = redis.createClient();

client.on('error', function(err){
	consol.log("redis client Error " + err);
});

exports.regist = function (req, res) {
	var regId = req.body['regId'];
	console.log (regId);
        // 원래는 DB 에 저장하는 부분이 있어야 할 것입니다. 받아서 디비에 저장하기       

	res.send("asdf");
	res.end(); 
} 

exports.send_push = function(req, res) {
	var message = new gcm.Message();
	var sender = new gcm.Sender('AIzaSyB8Pmbktp_SiGOWJ-XwQTvYmE9hNZCDOX8');
	var registrationIds = [];

	// Optional
	message.addData('hi','hello');
	message.addData('zozozo','rororo');
	message.collapseKey = 'demo';
	message.delayWhileIdle = true;
	message.timeToLive = 3;

// At least one required
	registrationIds.push('APA91bGSPSEqUKDOKfdvVjmGJm0dKnOKAbX1AXpW5-NCatxMnEtkjDxeN2FGRaC5AVmAj1oOKTCEKbZ0AEq-mcETx-yC3hHK1QE1YCTRMS87Al8tZAHvhDh6b12Mm619g1EVsQ5ZsIhk2c2mQO0LjqQtRa9MtX-ZYQ');
        // 만약 제대로 구현 됐다면 디비에서 읽어서 가져오겠지요?  
/**

 * Parameters: message-literal, registrationIds-array, No. of retries, callback-function

 */
	sender.send(message, registrationIds, 4, function (err, result) {
			console.log(result);
			res.write("Asdf");
			res.end();
	});

// 	sender.sendNoRetry(message, registrationIds-array, function (err, result) {

//     console.log(result);

// }); // retry 없이 보내는 부분입니다. 보통은 이것을 더 많이 애용할 것 같습니다. 

	

}
