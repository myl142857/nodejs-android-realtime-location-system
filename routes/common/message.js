var common = require('./common');

var status_msg = {
	"0000" : "success",
	"0001" : "param_error",
	"0002" : "validation_error",
	"0003" : "invalid_token",
	"1000" : "db_select_error",
	"1001" : "db_insert_error",
	"1002" : "db_update_error",
	"1003" : "db_delete_error",
	"4000" : "already_deleted",
	"5000" : "internal_error"
};

exports.sendMessage = function(res, status, data){
	var response = {};

	response.status = status_msg[status];

	if(data == undefined || common.isEmpty(data)){
		response.data = "NODATA";
	}else{
		response.data = data;
	}

	res.send(JSON.stringify(response));
}
