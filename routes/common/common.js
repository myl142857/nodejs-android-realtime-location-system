String.prototype.trim = function(){
	return this.replace(/^\s+|\s+$/g, "");
};

exports.makeUserKey = function(phoneNumber){
	if(this.isNull(phoneNumber)){
		return false;
	}
  return "user:"+phoneNumber.split('-').join('');
}

exports.consoleError = function(error){
  console.log("Error: "+error);
}

exports.sendJson = function(data, res){
  res.send(JSON.stringify(data));
}

exports.isEmpty = function(str){
	if(str == undefined){
		return true;
	}
	var mString = new String(str);
	if(mString.length < 1){
		return true;
	}
	if(mString.split(' ').join('') == ''){
		return true;
	}
}

exports.makePhoneNumber = function(phoneNumber){
	var returnData = "";
	if(this.isEmpty(phoneNumber)){
		return {status:0001};
	}

	if(this.isEmpty(phoneNumber.trim())){
		return {status:0002};
	}

	returnData = phoneNumber.split('-').join('');

	if(isNaN(returnData)){
		return {status:0002};
	}
	
	return {status:0000, data:returnData};
}
