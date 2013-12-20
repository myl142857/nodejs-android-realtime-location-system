var sha1 = require('sha1');

exports.getPassword = function(id, pwd, access_token){
	return sha1(pwd+sha1(id + pwd) + sha1(access_token));
}

exports.getAccessToken = function(phoneNumber, regId){
	return sha1(phoneNumber + sha1(regId));
}

exports.checkAccessToken = function(origin, compare){
	return (origin == compare) ? true : false;
}
