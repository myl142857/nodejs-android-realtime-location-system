exports.makeUserKey = function(phoneNumber){
	if(this.isNull(phoneNumber)){
		return false;
	}
  return "user:"+phoneNumber.split('-').join('');
}

exports.consoleError = function(error){
  console.log("Error: "+error);
}

exports.sendError = function(error, res){
  res.send("Error: " +error);
}

exports.sendJson = function(data, res){
  res.send(JSON.stringify(data));
}

exports.isNull = function(str){
	if(str == undefined){
		return true;
	}
	if(str.length < 1){
		return true;
	}
	if(str.split(' ').join('') == ''){
		return true;
	}
}
