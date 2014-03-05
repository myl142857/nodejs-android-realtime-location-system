<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require_once BASEPATH."core/ExceptionCode.php";

class ClassLoaderException extends Exception{
	public function __construct(){
		parent::__construct("Class Loader Error", ExceptionCode::$ClassLoader);
	}
}
