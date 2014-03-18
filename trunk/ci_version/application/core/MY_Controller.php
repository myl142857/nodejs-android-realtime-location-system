<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require_once(APPPATH."core/interfaces.php");
require_once(APPPATH."core/DBController.php");

abstract class MY_Controller extends CI_Controller{
	public function __construct(){
		parent::__construct();
	}
	public function __destruct(){
		DBC::destroy();
	}
	public function response($data = null, $code = 200, $status_msg = ''){
		set_status_header($code, $status_msg);

		exit(json_encode($data));
	}
}

abstract class DefaultController extends MY_Controller{
	public function __construct(){
		parent::__construct();
	}
	abstract public function regist();
	abstract public function get_info();
	abstract public function unregist();
}

