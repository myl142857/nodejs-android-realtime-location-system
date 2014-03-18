<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require_once BASEPATH."core/ExceptionCode.php";

class DBException extends Exception{
	public function __construct($msg, $code=null){
		parent::__construct($msg, $code);
	}
}

/**
 @brief below functions are using for db Exceptions
 */
class DBExecuteException extends DBException{
	public function __construct($code, $msg){
		if($code == 1062){
			parent::__construct("Duplicated: ".$msg);
		}else{
			parent::__construct("Execute Query Error : {$code}-{$msg}", ExceptionCode::$DBExecute);
		}
	}
}

class DBInvalidQueryExeption extends DBException{
	public function __construct(){
		parent::__construct("Query is Invalid", ExceptionCode::$DBInvalidQuery);
	}
}

class DBUnableConnectException extends DBException{
	public function __construct(){
		parent::__construct("Unable to Connect", ExceptionCode::$DBUnableConnect);
	}
}

class DBUnableSelectDBException extends DBException{
	public function __construct(){
		parent::__construct("Unable Select DB", ExceptionCode::$UnableSelectDB);
	}
}

class DBUnableSetCharException extends DBException{
	public function __construct(){
		parent::__construct("Unable Set Char", ExceptionCode::$DBUnableSetChar);
	}
}

/* End of file DBException.php */
/* Location: ./system/core/DBException.php */
