<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class S_user extends ServiceController{
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
			$rs = $this->m_user2->insertUser2();
		}catch(Exception $e){
			print_r($e->getMessage());
		}
	}
}
