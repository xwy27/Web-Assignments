var blankPosX = 4;
var blankPosY = 4;
var step = 0;
var time = 0;
var timeCounter = null;

function count() {
	document.getElementById('time').innerText = time;
	time += 1;
}

function puzzleLoad() {
	var puzzle = document.getElementById('puzzle');
	while (puzzle.hasChildNodes()) {
		puzzle.removeChild(puzzle.firstChild);
	}
	for (var i = 1; i < 16; ++i) {
		var node = document.createElement('div');
		node.className = 'block pos' + Math.ceil(i / 4) + '-' + (i % 4 == 0 ? 4 : i % 4);
		node.id = 'block' + i;
		puzzle.appendChild(node);
	}
	document.getElementById('start').onclick = start;
	document.getElementById('reset').onclick = reset;
}

function isCompleted() {
	var block = document.getElementsByClassName('block');
	for (var i = 1; i <= block.length; ++i) {
		if (document.getElementById('block' + i).className !=
			'block pos' + Math.ceil(i / 4) + '-' + (i % 4 == 0 ? 4 : i % 4)) {
			return false;
		}
	}
	return true;
}

function move(block) {
	var x = parseInt(block.className[9]);
	var y = parseInt(block.className[11]);
	if (x == blankPosX && Math.abs(y - blankPosY) == 1 ||
		y == blankPosY && Math.abs(x - blankPosX) == 1) {
		block.className = 'block pos' + blankPosX + '-' + blankPosY;
		blankPosX = x;
		blankPosY = y;
		step++;
		document.getElementById('step').innerText = step;
	}
	if (isCompleted()) {
		alert('You win in ' + time + ' seconds!');
		document.getElementById('reset') = true;
		document.getElementById('start') = false;
		var block = document.getElementsByClassName('block');
		for (var i = 1; i <= block.length; ++i) {
			block[i].onclick = function () {
				return false;
			}
		}
		step = 0;
		document.getElementById('step').innerText = step;
		clearInterval(timeCounter);
		time = 0;
		document.getElementById('time').innerText = time;
	}
}

function mix() {
	var tiles = document.getElementsByClassName('block');
	var array = [];
	var sum = blankPosX; // Row number of the blank tile
	for (var i = 0; i < tiles.length; i++) {
		array[i] = i + 1;
	}
	for (i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	for (i = 0; i < array.length - 1; i++) {
		for (j = i + 1; j < array.length; j++) {
			if (array[i] > array[j]) {
				sum++;
			}
		}
	} // The number of permutation inversions, see http://mathworld.wolfram.com/15Puzzle.html
	if (sum % 2 != 0) {
		temp = array[0];
		array[0] = array[1];
		array[1] = temp;
	} // If it's unsolvable(sum is odd), swap first 2 elements and it will become solvable!
	for (i = 0; i < tiles.length; i++) {
		document.getElementById("block" + (i + 1)).className = "block pos" + Math.ceil(array[i] / 4) + "-" + (array[i] % 4 == 0 ? 4 : array[i] % 4);
	}
}

function start() {
	document.getElementById("start").disabled = true;
	document.getElementById("reset").disabled = false;
	var block = document.getElementsByClassName('block');
	for (var i = 0; i < block.length; ++i) {
		block[i].onclick = function () {
			move(this);
		}
	}
	mix();
	count();
	timeCounter = setInterval(count, 1000);
	document.getElementById('step').innerText = step;
}

function reset() {
	var block = document.getElementsByClassName('block');
	document.getElementById("reset").disabled = true;
	document.getElementById("start").disabled = false;
	for (var i = 1; i <= block.length; i++) {
		document.getElementById("block" + i).className = "block pos" + Math.ceil(i / 4) + "-" + (i % 4 == 0 ? 4 : i % 4);
		block[i - 1].onclick = function () {
			return false;
		} // Remove onclick event
	}
	blankPosX = 4;
	blankPosY = 4;
	step = 0;
	document.getElementById('step').innerText = step;
	clearInterval(timeCounter);
	time = 0;
	document.getElementById('time').innerText = time;
}

window.onload = function () {
	puzzleLoad();
}