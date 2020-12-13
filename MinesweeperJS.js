var game = {};
game.gameStarted = false;
game.gameFinished = false;
game.flagsUsed = 0;
game.startTime = 0;
game.finishTime = 0;

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds + "." + (millis % 1000) + "s");
}

function createGrid(difficulty) {	//Puts game grid together based on difficulty
	diffButtons = document.getElementById("diffButtons").classList.add("hide");
	game.numRows = 0; game.numCols = 0; game.numMines = 0;
	var gameGrid = document.getElementById("gameGrid");
	switch (difficulty) {
		case 'Easy':
			game.numRows = 9;
			game.numCols = 9;
			game.numMines = 10;
			game.flagsUsed = 10;
			gameGrid.setAttribute("class","easyGrid");
			break;
		case 'Medium':
			game.numRows = 16;
			game.numCols = 16;
			game.numMines = 40;
			game.flagsUsed = 40;
			gameGrid.setAttribute("class","mediumGrid");
			break;
		case 'Hard':
			game.numRows = 16;
			game.numCols = 30;
			game.numMines = 99;
			game.flagsUsed = 99;
			gameGrid.setAttribute("class","hardGrid");
			break;
		case 'Custom':
			game.numRows = parseInt(prompt("Enter number of rows"));
			if(game.numRows > 50){
				game.numRows = parseInt(prompt("No more than 50 rows please!"));
			}
			game.numCols = parseInt(prompt("Enter number of columns"));
			if(game.numCols > 50){
				game.numCols = parseInt(prompt("No more than 50 columns please!"));
			}
			game.numMines = parseInt(prompt("How many mines?"));
			game.flagsUsed = game.numMines;
			if(game.numMines >= game.numCols * game.numRows){
				game.numMines = parseInt(prompt("That's too many! Select a lower amount!"));
			}else if(game.numMines === 0){
				game.numMines = parseInt(prompt("You need at least one mine!"));
			}else{
				gameGrid.setAttribute("class","customGrid");
			}
			break;
	}
	for (i=0;i<=(game.numRows-1);i++) {
		var newRow = document.createElement("tr");
		newRow.className = "gridRow-" + i;
		document.getElementById("gameGrid").appendChild(newRow);
		
		for (j=0;j<=(game.numCols-1);j++) {
			
			var btn = document.createElement("button");		
			var buttonVal = j;
			btn.setAttribute("onclick","clickSquare(this)");
			btn.className = "mineButton";
			btn.setAttribute("oncontextmenu","rightClick(this);return false;");
			btn.value = buttonVal;
			newRow.appendChild(btn);

		}
	}
	document.getElementById("gameGrid").classList.remove("hide");
	document.getElementById("restartGame").classList.remove("hide");
  	document.getElementById("flagsCounter").innerHTML = game.flagsUsed;
  	document.getElementById("timerClock").innerHTML = 000;
	document.getElementById("flagsCounting").classList.remove("hide");
  	document.getElementById("timer").classList.remove("hide");
}

function timerUpdate(){	
	game.finishTime = Date.now() - game.startTime;
	document.getElementById("timerClock").innerHTML = Math.floor(game.finishTime / 1000);
}

function rightClick(flagIt) {	//Functionality for flagging squares and questioning squares
	switch (flagIt.className) {
		case "flagged":
			flagIt.className = "mineButton qMark";
			flagIt.setAttribute("onclick","clickSquare(this)");
			game.flagsUsed++;
			document.getElementById("flagsCounter").innerHTML = game.flagsUsed;
			break;
		case "mineButton qMark":
			flagIt.className = "mineButton";
			break;
		default:
			var flagsTotal = document.querySelectorAll(".flagged").length;
			if (flagsTotal < game.numMines){
				if(game.flagsUsed > 0){
					flagIt.className = "flagged";
					flagIt.removeAttribute("onclick");
					game.flagsUsed--;
					document.getElementById("flagsCounter").innerHTML = game.flagsUsed;
				}else{
					alert("You've used all of your flags!");
				}
			}else{
				alert("You've placed more flags than there are mines!")	
			}
	}
}

function clickSquare(clickBtn) {	//Function required to check if the square clicked is the first square
	var row = clickBtn.parentNode.className;
	var clickRow = parseInt(row.substring(8));
	var clickCol = parseInt(clickBtn.value);
	if (!game.gameStarted && !game.gameFinished) {
		assignGrid(clickRow,clickCol);	//run assignGrid() for clicked square AND reveal square
		game.startTime = Date.now();
      	window.timer = setInterval(timerUpdate,50);
		game.gameStarted = true;
	}
	revealSquare(clickBtn,clickRow,clickCol);
}

function assignGrid(firstClickRow,firstClickCol) {	//Place the mines AFTER FIRST GRID CLICK. Impossible to lose on first click
	var blankArray = [0];	//Create first row of empty grid array
	for (j=1;j<game.numCols;j++) {
		blankArray.push(0);
	}
	game.gridArray = [blankArray];
	for (i=1;i<game.numRows;i++) {	//Finish empty grid array
		game.gridArray.push(blankArray.slice(0));
	}
	var minesPositions = new Array([Math.floor(Math.random()*game.numRows),Math.floor(Math.random()*game.numCols)]);	//Define coordinates of first mine
	while (minesPositions[0][0] === firstClickRow && minesPositions[0][1] === firstClickCol) {	//Make sure the first clicked square is not a mine
		minesPositions[0][0] = Math.floor(Math.random()*game.numRows);
		minesPositions[0][1] = Math.floor(Math.random()*game.numCols);			
	}
	
	for (i=1;i<=(game.numMines-1);i++){	//Add all mines coordinates, making sure they do not match the first clicked
		minesPositions.push([Math.floor(Math.random()*game.numRows),Math.floor(Math.random()*game.numCols)]);		
		notClicked(firstClickRow,firstClickCol,minesPositions,i)
		var j = i-1;
		while (j > -1) {
			if (minesPositions[i][0] == minesPositions[j][0] && minesPositions[i][1] == minesPositions[j][1]) {
				minesPositions[i][0] = Math.floor(Math.random()*game.numRows);
				minesPositions[i][1] = Math.floor(Math.random()*game.numCols);
				notClicked(firstClickRow,firstClickCol,minesPositions,i)
				j = i-1;
			}else {
				j--;
			}
		}
	}
	for (i=0;i<(game.numMines);i++) {	//Place mines on gridArray
		var row = minesPositions[i][0];
		var col = minesPositions[i][1];
		game.gridArray[row][col] = "Mine";
	}
	for (i=0;i<game.numCols;i++) {	//place number indicators in to gridArray
		for (j=0;j<game.numRows;j++) {
			if (game.gridArray[j][i] !== "Mine") {
				placeNumbers(i,j);
			}
		}		
	}	
}

function notClicked(firstClickRow,firstClickCol,minesPositions,rowVal) {	//Do not place a mine where the first click was
	while (minesPositions[rowVal][0] === firstClickRow && minesPositions[rowVal][1] === firstClickCol) {
		minesPositions[rowVal][0] = Math.floor(Math.random()*game.numRows);
		minesPositions[rowVal][1] = Math.floor(Math.random()*game.numCols);				
	}
}

function placeNumbers(col,row) {	//Full number indicator placement
	for (k=row-1;k<=row+1;k++) {
		if(game.gridArray[k] !== undefined){
			for (l=col-1;l<=col+1;l++) {
				if (k!==row || l!==col) {
					if((game.gridArray[k][l] !== undefined) && (game.gridArray[k][l] == "Mine")) {
						game.gridArray[row][col]++;
					}					
				}
			}
		}
	}	
}

function revealSquare(btnTag,rowIndex,colIndex) { 
	var parent = btnTag.parentNode,
		clickedSquare = document.createElement("div"),
		squareText = document.createElement("span");
	switch (game.gridArray[rowIndex][colIndex]) {
		case "Mine":
			clickedSquare.className = "clicked mine";
			parent.replaceChild(clickedSquare,btnTag);
			if(!game.gameFinished){
				clickedSquare.id = "losingSquare";
				endGame("Loss");
			}	
			break;
		case 0:
			var number = document.createTextNode(" ")
			clickedSquare.className = "clicked";
			clickedSquare.setAttribute("value",game.gridArray[rowIndex][colIndex]);
			parent.replaceChild(clickedSquare,btnTag);
			clickedSquare.appendChild(number);
			traverseEmptySquares(rowIndex,colIndex);	//reveal empty squares all around
			break;
		default:
			squareText.innerHTML = game.gridArray[rowIndex][colIndex];
			clickedSquare.appendChild(squareText);
			clickedSquare.className = "clicked";
			clickedSquare.setAttribute("value",game.gridArray[rowIndex][colIndex]);
			parent.replaceChild(clickedSquare,btnTag);
			break;		
	}
	if(!game.gameFinished){
		endGame("Win");
	}
}

function endGame(result) {	//Checks after every mine click if you have won or lost
	switch(result){
		case "Win":		
			var remainingButtons = document.querySelectorAll('.mineButton'),
				flaggedSquares = document.querySelectorAll('.flagged'),
				total = flaggedSquares.length + remainingButtons.length;
			if (total == game.numMines) {	//You can only win when number of buttons left = number of mines			
				while (remainingButtons.length > 0){	//Flag all mines
					var e = remainingButtons[0].ownerDocument.createEvent('MouseEvents');
					e.initMouseEvent('contextmenu', true, true, remainingButtons[0].ownerDocument.defaultView, 1, 0, 0, 0, 0, false, false, false, false,2, null);
					!remainingButtons[0].dispatchEvent(e);
					remainingButtons = document.querySelectorAll('.mineButton');
				}				
				if(!game.gameFinished){
					//alert ("You win!");
					window.clearInterval(timer);
					game.gameFinished = true;
					triggerOverlay();
				}
			}			
			break;	
		case "Loss":	
			if(!game.gameFinished){
				alert ("You lose!");
				window.clearInterval(timer);
				game.gameFinished = true;			
				var remainingSquares = document.querySelectorAll(".mineButton");
				while (remainingSquares.length > 0){	//Click all squares
					clickSquare(remainingSquares[0]);
					remainingSquares = document.querySelectorAll(".mineButton");
				}			
				showFalseFlags();
			}
			break;
	}	
}

function triggerOverlay(){
	window.setTimeout(function(){
		var timeInput = document.createElement("input");
		timeInput.setAttribute("type","text");
		timeInput.readOnly = true;
		timeInput.setAttribute("value",millisToMinutesAndSeconds(game.finishTime));
		timeInput.setAttribute("name",document.getElementById("gameGrid").className);
		document.querySelector("#winForm > label").setAttribute("for",document.getElementById("gameGrid").className);
		timeInput.className = "form-control-plaintext mb-2";
		timeInput.id = "winTime";
		timeInput.setAttribute("name",document.getElementById("gameGrid").className);
		document.querySelector("#winForm").insertBefore(timeInput,document.querySelector("#winForm .input-group"));	
		if(document.getElementById("gameGrid").className == "customGrid"){
			document.getElementById("winMsg").innerText = "That was a custom game so your time can't be uploaded!";
			document.querySelector("#winOverlay .input-group").classList.add("hide");
		}else{
			document.querySelector("#winOverlay .input-group").classList.remove("hide");
		}
		$("#winOverlayBg").fadeIn(100);
		$("#winOverlay").fadeIn(100);
		window.setInterval(function(){
			var width = Math.max(Math.random()*200,50);
			$(".firework").css({"width":width + "px","top":Math.max(0,(Math.random() * $("#winOverlay").height()) - width) + "px","left":Math.max(0,(Math.random() * $("#winOverlay").width()) - width)})
		},900);
	},250);
}

function showFalseFlags(){	//Show false flags if there are any when you lose
	var flags = document.querySelectorAll(".flagged")
	if (flags.length > 0){		//check if flag coordinate is not the same as any mine coordinate
		var minesFound = 0;	
		var minesPositions = [0];	//Find mines
		for(var k=1;k<game.numMines;k++){
			minesPositions.push(0);
		}
		minesArray = [minesPositions];
		minesArray.push(minesPositions.slice(0));
		for (var i=0;i<game.numRows;i++){
			for (var j=0;j<game.numCols;j++){
				if(game.gridArray[i][j] == "Mine"){
					minesArray[0][minesFound] = i;
					minesArray[1][minesFound] = j;
					minesFound = minesFound + 1;
				}
			}
		}
		var flagRow = "";	//Find flags and check if they are mines, one by one
		var flagRowIndex = 0;
		var flagColIndex = 0;
		for (var l=0;l<flags.length;l++){
			flagRow = flags[l].parentNode.className;
			flagRowIndex = parseInt(flagRow.substring(8));
			flagColIndex = parseInt(flags[l].value);
			var itsFalse = true;
			for (var mineCheckerIndex=0;mineCheckerIndex < game.numMines;mineCheckerIndex++){
				if(flagRowIndex == minesArray[0][mineCheckerIndex] && flagColIndex == minesArray[1][mineCheckerIndex]){
					itsFalse = false;
					break;
				}				
			}
			if(itsFalse){
				flags[l].className = "flagged falseFlag"
				var noMine = document.createTextNode("X");
				flags[l].appendChild(noMine);
			}
		}		
	}	
}

function traverseEmptySquares(rowClicked,colClicked){	//If the square clicked was empty, auto-click all surrounding squares
	//Start with top left and go clockwise
	var above = rowClicked - 1,
		below = rowClicked + 1,
		left = colClicked - 1,
		right = colClicked + 1;
	var surroundingRows = [above, above, above, rowClicked, below, below, below, rowClicked];
	var surroundingCols = [left, colClicked, right, right, right, colClicked, left, left];
	var squaresToCheck = [0,0,0,0,0,0,0,0];
	var queryString = [0,0,0,0,0,0,0,0];
	
	for (var j=0;j<8;j++) {
		var r = surroundingRows[j];
		var c = surroundingCols[j];
		queryString[j] = ".gridRow-" + r + " > .mineButton[value='" + c + "']";
		squaresToCheck[j] = document.querySelector(queryString[j]);		
		if(!(squaresToCheck[j] == null) && !(squaresToCheck[j].className.indexOf("checked") > -1)) {
			clickSquare(squaresToCheck[j]);
			squaresToCheck[j].className += " checked";
		}
	}
}
	
function restart() {	//Reset the board
	var grid = document.getElementById("gameGrid");
	grid.innerHTML = "";
    grid.classList.add("hide");
	document.getElementById("restartGame").classList.add("hide");
	document.getElementById("diffButtons").classList.remove("hide");
  	document.getElementById("flagsCounter").innerHTML = "00";
  	document.getElementById("flagsCounting").classList.add("hide");
  	document.getElementById("timer").classList.add("hide");
  	game.flagsUsed = 0;
	game.maxFlags = 0;
	game.gameStarted = false;
	game.gameFinished = false;
}