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

exports.makeMessage = function(res, status, data){
	var response = {};
	if(status == 'success'){
		response.status = 0;
	}else{
		response.status = status;
	}
	if(data == undefined || !data.length){
		response.data = {data:"NODATA"};
	}else{
		response.data = data;
	}

	res.send(JSON.stringify(response));
}
