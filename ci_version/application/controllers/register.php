<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Register extends DefaultController{
	public function __construct(){
		parent::__construct();
	}
	public function regist(){
		try{
			$phoneNumber = $this->input->post('phoneNumber', true);
			$regId = $this->input->post('redId', true);
			$os_version = $this->input->post('os_version', true);
			$model_name = $this->input->post('model_name', true);

			if(empty($phoneNumber))
				throw new InvalidParamException();
			if(empty($regId))
				throw new InvalidParamException();

		}catch(InvalidParamException $ie){
		}catch(Exception $e){
			
		}
	}
	public function get_info(){
	}
	public function unregist(){
	}
}
