<?php 
	session_start();
	include("dbConnect.php");	
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
		<title>Minesweeper Hi-Scores</title>
	</head>
	<body>
		<main role="main" id="mainContent">
			<div class="container">
				<div class="row">
					<div class="col" style="text-align:center;">
						<h1 id="mainTitle">Hi-Scores</h1>
						<p id="newTimeMsg"><em></em></p>
					</div>
				</div>
				<div class="row" style="margin-top:1em;margin-bottom:1em;">
					<div id="diffButtons" class="col" style="text-align:center;">
						<button class="btn btn-success" onclick="getScores('easy_time',this)">Easy</button>
						<button class="btn btn-warning" onclick="getScores('medium_time',this)">Medium</button>
						<button class="btn btn-danger" onclick="getScores('hard_time',this)">Hard</button>
					</div>
				</div>
				<div class="row">
					<div class="col">
						<h2 id="tableTitle" style="text-align:center;"></h2>
						<table id="timesTable" class="table table-striped table-hover">
							<thead class="table-dark">
								<tr>
									<th scope="col">#</th>
									<th scope="col">Name</th>
									<th scope="col">Time</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<th scope="row"><img src="trophy-award-svgrepo-com.svg" style="width:20px;" /></th>
									<td></td>
									<td></td>
								</tr>
							</tbody>
						</table>
						<div class="row" style="margin-top:1em;margin-bottom:1em;">
							<div class="col" style="text-align:center;">
								<a id="restartGame" href="index.php" class="btn btn-secondary">Back to game</a>
							</div>
						</div>	
					</div>
				</div>
			</div>
		</main>
		<script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></script>
		<script type="text/javascript">
			function millisToMinutesAndSeconds(millis) {
				var minutes = Math.floor(millis / 60000);
				var seconds = ((millis % 60000) / 1000).toFixed(0);
				return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds + "." + (millis % 1000) + "s");
			}
			
			var tableObj = new Object();
			var difficulty;
			$.ajax("getTimes.php")
			.done(function(response){
				tableObj = JSON.parse(response)
				difficulty = tableObj["difficulty"];
				$("#newTimeMsg > em").text(tableObj["timeAdded"]);
				switch(difficulty){
					case "medium_time":
						$("#tableTitle").text("Fastest 25 Medium Times");
						$("#diffButtons > .btn-warning").prop("disabled",true);
						break;
					case "hard_time":
						$("#tableTitle").text("Fastest 25 Hard Times");
						$("#diffButtons > .btn-danger").prop("disabled",true);
						break;
					default:
						$("#tableTitle").text("Fastest 25 Easy Times");
						$("#diffButtons > .btn-success").prop("disabled",true);
						break;
				}
				var scoresTable = $("#timesTable");
				var	name = tableObj["names"],
					time = tableObj["times"];
				for(var num = 0; num<tableObj["names"].length; num++){
					if(num == 0){
						$("#timesTable tr > td:not(:last-child)").text(name[num]);
						$("#timesTable tr > td:last-child").text(millisToMinutesAndSeconds(parseFloat(time[num])));
					}else{
						$("#timesTable tr:last").after('<tr><th scope="row">' + (num+1) + '</th><td>' + name[num] + '</td><td>' + millisToMinutesAndSeconds(parseFloat(time[num])) + '</td></tr>');
					}
				}	
			})
			.fail(function(){
				$("#newTimeMsg").text("Something went wrong!");
			});
			
			function getScores(value,element){
				$("#diffButtons > button[disabled]").prop('disabled', false);
				$(element).prop('disabled', true);
				$("#timesTable > tbody").html('<tr><th scope="row"><img src="trophy-award-svgrepo-com.svg" style="width:20px;" /></th><td></td><td></td></tr>');
				$.ajax({
					method: "POST",
					url: "getTimes.php",
					data: {
						content: value
					}
				})
				.done(function(response){
					var tableObj = new Object();
					var difficulty;
					tableObj = JSON.parse(response)
					difficulty = tableObj["difficulty"];
					$("#newTimeMsg > em").text(tableObj["timeAdded"]);
					switch(difficulty){
						case "medium_time":
							$("#tableTitle").text("Fastest 25 Medium Times");
							break;
						case "hard_time":
							$("#tableTitle").text("Fastest 25 Hard Times");
							break;
						default:
							$("#tableTitle").text("Fastest 25 Easy Times");
							break;
					}
					var scoresTable = $("#timesTable");
					var	name = tableObj["names"],
						time = tableObj["times"];
					for(var num = 0; num<tableObj["names"].length; num++){
						if(num == 0){
							$("#timesTable tr > td:not(:last-child)").text(name[num]);
							$("#timesTable tr > td:last-child").text(millisToMinutesAndSeconds(parseFloat(time[num])));
						}else{
							$("#timesTable tr:last").after('<tr><th scope="row">' + (num+1) + '</th><td>' + name[num] + '</td><td>' + millisToMinutesAndSeconds(parseFloat(time[num])) + '</td></tr>');
						}
					}	
				})
				.fail(function(){
					$("#newTimeMsg").text("Something went wrong!");
				});
			}
		</script>		
	</body>
</html>