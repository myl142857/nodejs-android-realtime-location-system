<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class M_user2 extends MY_Model{
	public function __construct(){
		parent::__construct();
	}
	public function insertUser2(){
		$dbc =& $this->getConnection();
		$dbc->query("insert into user_phone (regId, phone) values ('1', '2', '3')");
	}
}
