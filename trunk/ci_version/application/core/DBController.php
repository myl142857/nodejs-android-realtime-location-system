<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class DBC{
	private static $_instance = null;
	private static $conn_list = array();
	private $_ci = null;

	private function __construct(){
		$this->_ci =& get_instance();
		$this->_initDB();
	}
	public static function destroy(){
		try{
			self::_clear_transaction();
			self::_clear_connection();
		}catch(Exception $e){
			
		}
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
			$this->_connectDB($pDBName);
		}
	}

	public function getConnection($pDBName){
		if(empty(self::$conn_list[$pDBName]) || !is_object(self::$conn_list[$pDBName])){
			self::_connectDB($pDBName);
		}
		return self::$conn_list[$pDBName];
	}

	public function getConnectionList(){
		return self::$conn_list;
	}

	private function _clear_connection(){
		foreach(self::$conn_list as $conn){
			if ( ! empty($conn) && is_resource($conn) ) $conn->close();
		}
	}

	private function _clear_transaction(){
		foreach(self::$conn_list as $conn){
			$conn->trans_complete();
		}
	}

	private function _initDB(){
		$this->_connectDB();
	}

	private function _connectDB($pDBName = "default"){
		if(!empty(self::$conn_list[$pDBName]) && is_object(self::$conn_list[$pDBName])) return;

		try{
			self::$conn_list[$pDBName] =& $this->_ci->load->database($pDBName, true);
		}catch(DBUnableConnectException $e){
		}catch(DBUnableSelectDBException $e){
		}catch(DBUnableSetCharException $e){
		}catch(Exception $e){
		}
	}
}
