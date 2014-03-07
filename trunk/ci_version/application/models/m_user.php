<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class M_user extends MY_Model{
	public function __construct(){
		parent::__construct();
	}
	public function insertUser(){
		$dbc =& $this->getConnection();
		$dbc->query("insert into user_phone (regId, phone, access_token) values ('1', '2', '3')");
	}
}
