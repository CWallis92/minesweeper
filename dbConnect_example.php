<?php
	$whitelist = array('127.0.0.1','::1');
	if(in_array($_SERVER['REMOTE_ADDR'],$whitelist)){
		$servername = "localhost";
		$username = "root";
		$password = "";
		$dbname = "test";	
	}else{
		$servername = "exampleServer";
		$username = "exampleUsername";
		$password = "examplePassword";
		$dbname = "exampleDBName";	
	}
	$conn = mysqli_connect($servername,$username,$password,$dbname);
	if(mysqli_connect_error()){
		die("There was an error connecting to the database");
	}
?>