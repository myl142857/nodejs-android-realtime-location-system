<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

abstract class MY_Exception extends Exception{
	protected $_ci = null;

	public function __construct($msg, $code=null){
		parent::__construct($msg, $code);
	}
}

class InvalidParamException extends MY_Exception{
	public function __construct($msg='Requested parameter is invalid', $code=400){
		parent::__construct($msg, $code);
	}
}

function exceptionHandler(Exception $e){
	$ci =& get_instance();
	try{
		throw $e;
	}catch(InvalidParamException $e){
		$ci->response($e->getMessage(), $e->getCode(), 'Invalid Parameters');
	}catch(Exception $e){
		
	}
}
