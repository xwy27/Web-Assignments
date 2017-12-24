var start = 0;
var end = 0;
var cheat = 0;

window.onload = function () {
	var cheatCheck = document.getElementById('cheat');
	var startCheck = document.getElementById('start');
	var endCheck = document.getElementById('end');
	var block = document.getElementsByClassName('block');
	var outer = document.getElementsByClassName('outer');

	cheatCheck.onmousemove = function () {
		if (start) {
			cheat = 1;
		}
		if (end) {
			for (var k = 0; k < document.getElementsByClassName('blockChanged').length; ++k) {
				document.getElementsByClassName('blockChanged')[k].setAttribute("class", "block");
			}
		}
	}

	startCheck.onmousemove = function () {
		document.getElementById('result').textContent = "Game start! Having a good time!"
		for (var i = 0; i < document.getElementsByClassName('blockChanged').length; ++i) {
			document.getElementsByClassName('blockChanged')[i].setAttribute("class", "block");
		}
		start = 1;
		end = 0;
		cheat = 0;
	}

	endCheck.onmousemove = function () {
		if (start && !end && !cheat) {
			document.getElementById('result').textContent = "You Win!";
		} else if (start && !end && cheat) {
			document.getElementById('result').textContent = "Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!";
		}
		start = 0;
		end = 1;
		cheat = 0;
	}

	for (var i = 0; i < block.length; ++i) {
		block[i].onmousemove = function () {
			if (start && !end) {
				document.getElementById('result').textContent = "You Lose!";
				start = 1;
				end = 1;
				cheat = 0;
				this.setAttribute("class", "blockChanged");
			}
		}
	}

	for (var j = 0; j < outer.length; ++j) {
		outer[j].onmousemove = function () {
			for (var k = 0; k < document.getElementsByClassName('blockChanged').length; ++k) {
				document.getElementsByClassName('blockChanged')[k].setAttribute("class", "block");
			}
		}
	}
}