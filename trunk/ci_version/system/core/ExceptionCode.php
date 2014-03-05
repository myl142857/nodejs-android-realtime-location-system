<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 @brief the code for exception. this code is personal code.
 @brief 3xx codes for syntax error
 @brief 4xx codes for process error
 @brief 5xx codes for database error
 @author rock
 */
class ExceptionCode{
	public static $ClassLoader = 401;

	public static $DBExecute = 501;
	public static $DBInvalidQuery = 502;
	public static $DBUnableConnect = 503;
	public static $DBUnableSelectDB = 504;
	public static $DBUnableSetChar = 505;
}
