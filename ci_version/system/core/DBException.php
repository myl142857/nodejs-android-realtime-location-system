<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require_once BASEPATH."core/ExceptionCode.php";

/**
 @brief below functions are using for db Exceptions
 */
class DBExecuteException extends Exception{
	public function __construct(){
		parent::__construct("Execute Query Error", ExceptionCode::$DBExcecute);
	}
}

class DBInvalidQueryExeption extends Exception{
	public function __construct(){
		parent::__construct("Query is Invalid", ExceptionCode::$DBInvalidQuery);
	}
}

class DBUnableConnectException extends Exception{
	public function __construct(){
		parent::__construct("Unable to Connect", ExceptionCode::$DBUnableConnect);
	}
}

class DBUnableSelectDBException extends Exception{
	public function __construct(){
		parent::__construct("Unable Select DB", ExceptionCode::$UnableSelectDB);
	}
}

class DBUnableSetCharException extends Exception{
	public function __construct(){
		parent::__construct("Unable Set Char", ExceptionCode::$DBUnableSetChar);
	}
}

/* End of file DBException.php */
/* Location: ./system/core/DBException.php */
