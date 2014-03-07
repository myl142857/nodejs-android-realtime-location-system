<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class B_user extends BusinessController{
	public function __construct(){
		parent::__construct();
	}
	public function registUser(){
		$this->load->model("m_user");
		$this->load->model("m_user2");
		$dbc =& $this->getConnection();
		$dbc->trans_start();
		try{
		$this->m_user->insertUser();
		}catch(Exception $e){
			print_r($e->getMessage());
		}
		$dbc->trans_complete();
	}
}
