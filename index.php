<?php 
	session_start();
	include("dbConnect.php");	

	if($_POST && array_key_exists("name",$_POST)){
		
		$checkName = "SELECT * FROM `minesweeper` WHERE `name` = '".mysqli_real_escape_string($conn,$_POST["name"])."' LIMIT 1";
		
		if(array_key_exists("easyGrid",$_POST)){
			$timeString = $_POST["easyGrid"];
			$col = "easy_time";
		}else if(array_key_exists("mediumGrid",$_POST)){
			$timeString = $_POST["mediumGrid"];
			$col = "medium_time";
		}else if(array_key_exists("hardGrid",$_POST)){
			$timeString = $_POST["hardGrid"];
			$col = "hard_time";
		}
		$time = (explode(":",$timeString)[0] * 1000 * 60) + (explode(".",explode(":",$timeString)[1])[0] * 1000) + explode("s",explode(".",explode(":",$timeString)[1])[1])[0];
		
		$nameExists = mysqli_query($conn,$checkName);
		
		if(mysqli_num_rows($nameExists) > 0){
			$existingName = mysqli_fetch_array($nameExists);
			if(($existingName[$col] < $time) && ($existingName[$col] > 0)){	//Player has already recorded a better time
				$_SESSION["fasterTime"] = true;
			}else{
				$updateTime = "UPDATE `minesweeper` SET `".$col."` = ".$time." WHERE `name` = '".mysqli_real_escape_string($conn,$_POST["name"])."'";
				mysqli_query($conn,$updateTime);
				$_SESSION["player"] = $_POST["name"];
				unset($_SESSION["fasterTime"]);
			}
		}else{		
			$addTime = "INSERT INTO `minesweeper` (`name`,`".$col."`) VALUES('".mysqli_real_escape_string($conn,$_POST["name"])."','".$time."')";
			mysqli_query($conn,$addTime);
			$_SESSION["player"] = $_POST["name"];
		}		
		$_SESSION["difficulty"] = $col;
		header("Location: hiScores.php");
	}
?>
<!doctype html>
<html lang="en">
    <head>
		<meta charset="utf-8" />
		<meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link href="https://fonts.googleapis.com/css2?family=Beth+Ellen&display=swap" rel="stylesheet">
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
		<style>
			#mainContent{
				background: radial-gradient(#f7fbfc, #add9e4);
				min-height: 100vh;
			}
			#mainTitle{
				color: blue;
				margin: 25px auto;
				font-family: 'Beth Ellen', cursive;
			}
		</style>
		<title>Minesweeper</title>
		<link rel="stylesheet" type="text/css" href="MinesweeperStyleSheet.css">
	</head>
	<body>	
		<main role="main" id="mainContent">
			<div class="container">
				<div class="row">
					<div class="col" style="text-align:center;">
						<h1 id="mainTitle">Play Minesweeper!</h1>
						<em>(Now with scores!)</em>
					</div>
				</div>
				<div class="row align-items-center" style="min-height:calc(100vh - 3rem - 150px)">
					<div class="col" style="text-align:center;">
						<div id="diffButtons">
							<div class="d-flex justify-content-between" style="margin-top:1em;margin-bottom:1em;">
								<button class="btn btn-success" onclick="createGrid('Easy')">Easy</button>
								<button class="btn btn-warning" onclick="createGrid('Medium')">Medium</button>
								<button class="btn btn-danger" onclick="createGrid('Hard')">Hard</button>
							</div>
							<div class="d-flex justify-content-between" style="margin-top:1em;margin-bottom:1em;">
								<button class="btn btn-info" onclick="createGrid('Custom')">Custom</button>
							</div>
						</div>
						<div id="timer" class="hide"><strong>Time: </strong><span id="timerClock">000</span></div>
						<div id="flagsCounting" class="hide"><strong>Flags remaining: </strong><span id="flagsCounter">00</span></div>
						<div id="gameGrid" class="hide"></div>
						<div class="row" style="margin-top:1em;margin-bottom:1em;">
							<div class="col" style="text-align:center;">
								<button id="restartGame" onclick="restart()" class="btn btn-info hide">Restart Game</button>
							</div>
						</div>
						<div class="row" style="margin-top:1em;margin-bottom:1em;">
							<div class="col" style="text-align:center;">
								<a id="restartGame" href="hiScores.php" class="btn btn-secondary">View Hi-Scores</a>
							</div>
						</div>
						<div style="width: 600px;max-width: 100%;margin: auto;">
							<em><small>Everything in here is built from the ground up. No plugins or libraries (apart from Bootstrap styling), and completely custom JS, PHP &amp; SQL.<br/>If you're savvy enough, it's possible to cheat, though I won't say how. Haven't worked out a way to prevent it, aside from egregiously frequent AJAX calls to the server, but maybe one day!</small></em>
						</div>
					</div>
				</div>	
				<div id="winOverlayBg" style="display:none;"></div>
				<div id="winOverlay" style="display:none;">
					<img class="firework" src="firework.gif" />
					<h1>You won!</h1>
					<p id="winMsg">Save your time to see if you'll make it to the leaderboard</p>
					<p><img class="winFlag" src="flag.png" /></p>
					<form id="winForm" method="post">
						<label class="mb-0"><strong>Your time:</strong></label>
						<div class="input-group mb-3">
							<input id="winName" type="text" class="form-control" placeholder="e.g. Chris W" name="name">
							<div class="input-group-append">
								<button class="btn btn-success" type="submit">Save time</button>
							</div>
						</div>
					</form>
					<p id="errorHandling" class="alert alert-danger" role="alert" style="display:none;">Please add a name!</p>
					<button id="customClose" class="btn btn-secondary">Close</button>
				</div>		
			</div>
		</main>
		<script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></script>
		<script src="MinesweeperJS.js"></script>
		<script type="text/javascript">
			document.getElementById("customClose").onclick = function(){
				$("#winOverlayBg").fadeOut(100);
				$("#winOverlay").fadeOut(100);
				$("#winTime").remove();
			}
			$("#winForm").on("submit",function(){
				if($("#winName").val() == ""){
				   $("#errorHandling").show();
					return false;
				}
			});
		</script>
	</body>
</html>