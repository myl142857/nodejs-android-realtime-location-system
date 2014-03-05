<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class M_welcome extends CI_Model{
	public function aaa(){
		$db = $this->load->database('default', true);

		try{
			print_r($db->query("select * from user")->result_array());
		}catch(DBException $e){
		}
	}
}
