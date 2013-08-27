exports.makeUserKey = function(phoneNumber){
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

