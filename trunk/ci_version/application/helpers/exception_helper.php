<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

abstract class MY_Exception extends Exception{
	protected $_ci = null;

	public function __construct($msg, $code=null){
		parent::__construct($msg, $code);

		$this->_ci =& get_instance();
	}
}

class InvalidParamException extends MY_Exception{
	public function __construct($msg='Requested parameter is invalid', $code=400){
		parent::__construct($msg, $code);

		$this->_ci->response($msg, $code, 'Invalid Parameters');
	}
}
