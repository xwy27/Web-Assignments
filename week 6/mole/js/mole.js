var start = 0;
var stop = 0;
var score = 0;
var pos = -1;
var time = 30;
var timeCounter = null;
var hole = document.getElementsByClassName("hole");

window.onload = function () {
	createHole();
	document.getElementById("start").onclick = play;
}

function createHole () {
	var index = 1;
	for (var i = 0; i < 60; ++i) {
		node = document.createElement("button");
		node.setAttribute("id", ""+i);
		node.setAttribute("class", "hole");
		document.getElementById("row"+index).appendChild(node);
		if ((i+1) % 10 == 0) {
			index++;
		}
	}
}

function play () {
	clearInterval(timeCounter);
	if (!start && !stop) {
		count();
		timeCounter = window.setInterval(count, 1000);
		start = 1;
		stop = 0;
		score = 0;
		targetUp();
		targetDown();
		document.getElementById("GameState").value = "Playing";
		document.getElementById("score").value = score;
	} else if (!stop) {
	    stop = 1;
	    start = 0;
		clearInterval(timeCounter);
		timeCounter = null;
		hole[pos].setAttribute("class", "hole");
		pos = -1;
		document.getElementById("GameState").value = "Pasuing";
	} else if (stop)  {
	    stop = 0;
	    start = 1;
		count();
		timeCounter = setInterval(count, 1000);
		targetUp();
		targetDown();
		document.getElementById("GameState").value = "Playing";
	}
}

function GameOver() {
	if (start) {
		clearInterval(timeCounter);
		start = 0;
		stop = 0;
		time = 30;
		alert("Game Over.\nYour score is: " + score);
		hole[pos].setAttribute("class", "hole");
		pos = -1;
		document.getElementById("GameState").value = "Game Over!";
		document.getElementById("time").value = 30;
		document.getElementById("score").value = 0;
	}
}

function count () {
	document.getElementById("time").value = time;
	time = time - 1;
	if (time <= 0) {
		setTimeout(GameOver, 2000);
		time = 30;
	}
}

function targetUp() {
    if (start) {
        pos = Math.floor(Math.random() * 60);
        hole[pos].setAttribute("class", "hole chosen");
    }
}

function targetDown() {
    if (start) {
        for (var i = 0; i < hole.length; ++i) {
            hole[i].onclick = function () {
                if (this.id != pos && pos != -1) {
                    document.getElementById("score").value = --score;
                    hole[pos].setAttribute("class", "hole");
                } else if (this.id == pos) {
                    document.getElementById("score").value = ++score;
                    this.setAttribute("class", "hole");
                }
                targetUp();
            }
        }
    }
}