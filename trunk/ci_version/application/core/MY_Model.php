<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class MY_Model extends CI_Model{
	private $dbc = null;

	public function __construct(){
		parent::__construct();
		$this->dbc =& DBC::get_instance();
	}

	public function getConnection($pDBName = "default"){
		return $this->dbc->getConnection($pDBName);
	}
}

abstract class ServiceController extends MY_Model{
	public function __construct(){
		parent::__construct();
	}
}
