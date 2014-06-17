<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Register extends DefaultController{
	public function __construct(){
		parent::__construct();
	}
	public function regist(){
		try{
			$phoneNumber = $this->input->post('phoneNumber', true);
			$regId = $this->input->post('regId', true);
			$os_version = $this->input->post('os_version', true);
			$model_name = $this->input->post('model_name', true);

			if(empty($phoneNumber) || empty($regId))
				throw new InvalidParamException();

			$this->response($this->input->post());
		}catch(Exception $e){
			exceptionHandler($e);
		}
	}
	public function get_info(){
	}
	public function unregist(){
	}
}
