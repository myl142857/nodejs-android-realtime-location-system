<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class DBC{
	private static $_instance = null;
	private static $con_list = array();
	private $_ci = null;

	private function __construct(){
		$this->_ci =& get_instance();
		$this->_initDB();
	}

	public static function get_instance(){
		if(!is_object(self::$_instance))
			self::$_instance = new DBC();
		return self::$_instance;
	}

	public static function connect($pDBName){
		if(is_array($pDBName)){
			foreach($pDBName as $v){
				$this->connect($v);
			}
		}else{
			try{
				$this->_connectDB($pDBName);
			}catch(DBUnableConnectException $e){
			}catch(DBUnableSelectDBException $e){
			}catch(DBUnableSetCharException $e){
			}catch(Exception $e){
			}
		}
	}

	public function getConnection($pDBName){
		if(empty(self::$con_list[$pDBName]) || !is_object(self::$con_list[$pDBName])){
			try{
				self::_connectDB($pDBName);
			}catch(DBUnableConnectException $e){
			}catch(DBUnableSelectDBException $e){
			}catch(DBUnableSetCharException $e){
			}catch(Exception $e){
			}
		}
		return self::$con_list[$pDBName];
	}

	public function getConnectionList(){
		return self::$con_list;
	}

	private function _initDB(){
		$this->_connectDB();
	}

	private function _connectDB($pDBName = "default"){
		if(!empty(self::$con_list[$pDBName]) && is_object(self::$con_list[$pDBName])) return;

		self::$con_list[$pDBName] =& $this->_ci->load->database($pDBName, true);
	}
}
