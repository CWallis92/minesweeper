<?php 
	session_start();
	include("dbConnect.php");

	if(array_key_exists("difficulty",$_SESSION)){
		$diff = $_SESSION["difficulty"];
	}else if(array_key_exists("content",$_POST)){
		$diff = $_POST["content"];
	}else{
		$diff = "easy_time";
	}

	$fullTable = new \stdClass();
	$fullTable->names = array();
	$fullTable->times = array();

	$query = "SELECT `name`,`".$diff."` FROM `minesweeper` WHERE `".$diff."` > 0 ORDER BY `".$diff."` ASC LIMIT 25";
	if($result = mysqli_query($conn,$query)){
		if(mysqli_num_rows($result) > 0){
			while($row = mysqli_fetch_array($result)){
				array_push($fullTable->names,$row["name"]);
				array_push($fullTable->times,$row[$diff]);
			}	
		}
	}else{
		die("Connection failed");
	}

	$fullTable->difficulty = $diff;
	if(array_key_exists("fasterTime",$_SESSION)){
		$fullTable->timeAdded = "You already logged a faster time than the one you just submitted, so the old one has been kept";
	}else if(array_key_exists("player",$_SESSION)){
		$fullTable->timeAdded = "Your time's been added. Did you make it to the top 25?";
	}else{
		$fullTable->timeAdded = "";
	}

	$myJSON = json_encode($fullTable);
	echo $myJSON;

	session_unset();

?>