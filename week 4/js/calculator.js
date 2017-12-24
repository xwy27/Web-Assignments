function isOperator(value) {
	return (value == '+' || value == '-' || value == '*' || value == '/');
}

function isSame(value1, value2) {
	return value1 == value2;
}

function isNum(value) {
	return !(value == '+' || value == '-' ||
		value == '*' || value == '/' ||
		value == '(' || value == ')');
}

function priority(obj) {
	if (obj == '(') return 0;
	if (obj == '+' || obj == '-') return 1;
	if (obj == '*' || obj == '/') return 2;
	return -1;
}

function isPointValid(obj) {
	var pointFlag = false;
	for (var k = 0; k < obj.length; ++k) {
		if (obj[k] == '(' || obj[k] == ')' ||
			isOperator(obj[k])) {
			pointFlag = false;
		} else if (obj[k] == '.') {
			if (pointFlag == true) {
				return false;
			} else {
				pointFlag = true;
			}
		}
	}
	return true;
}

function isBracketValid(obj) {
	var arr = [];

	for (var k = 0; k < obj.length; ++k) {
		if (obj[k] == '(') {
			if (k != 0 && !isOperator(obj[k-1])) {
				return false;
			}
			arr.push('(');
		} else if (obj[k] == ')') {
			if (k != obj.length - 1 && !isOperator(obj[k-1])) {
				return false;
			}
			if (arr.length != 0) {
				arr.pop();
			} else {
				return false;
			}
		}
	}
	if (arr.length != 0) {
		return false;
	} else {
		return true;
	}
}

var flag = false; //If the text is calculated
var pointFlag2 = false;//If the digitPoint is valid to input

window.onload = function () {
	var button = document.getElementsByTagName('button');
	for (var i = 0; i < button.length; ++i) {
		button[i].onclick = function () {
			if (this.id == 'equal') {
				result();
			} else if (this.id == 'leftArrow') {
				textBack();
			} else if (this.id == 'CE') {
				textClear();
			} else {
				show(this);
			}
		}
	}

	function show(obj) {
		var text = document.getElementById('text');
		//enable to calculate after last calculation
		if (flag) {
			if (obj.value != '+' && obj.value != '-' &&
				obj.value != '*' && obj.value != '/') {
				text.value = '';
				pointFlag2 = false;
			}
			flag = false;
		}
		//disable to input same operator overtimes and
		//enable to change operator if different one is clicked
		if (isOperator(text.value[text.value.length - 1]) &&
			isSame(text.value[text.value.length - 1], obj.value)) {
			return;
		} else if (isOperator(text.value[text.value.length - 1]) &&
			!isSame(text.value[text.value.length - 1], obj.value) &&
			isOperator(obj.value)) {
			text.value = text.value.slice(0, -1);
			text.value = text.value + obj.value;
			pointFlag2 = false;
		} else if (obj.value == '.') {
			if (pointFlag2) {
				return;
			} else {
				pointFlag2 = true;
				text.value += obj.value;
			}
		} else if (obj.value == '(' || obj.value == ')' ||
				   isOperator(obj.value)) {
			text.value += obj.value;
			pointFlag2 = false;
		} else {
			text.value += obj.value;
		}
	}

	function textClear() {
		document.getElementById('text').value = '';
		flag = false;
	}

	function textBack() {
		var text = document.getElementById('text');
		//disable the operation on the result of the calculation
		if (!flag) {
			if (text.value == '') {
				text.value = '';
			} else {
				var temp = text.value[text.value.length - 1];
				text.value = text.value.slice(0, -1);
				if (text.value.length == 0) {
					text.value = '';
				}
			}
		}
	}

	function result() {
		var text = document.getElementById('text');
		var error = false;

		if (!isPointValid(text.value) || !isBracketValid(text.value)) {
			alert('Wrong expression!');
			return;
		}

		if (text.value.length == 0) {
			text.value = 0;
		} else {
			//turn to postFixed expression
			var output = [];
			var arr = [];

			for (var i = 0; i < text.value.length; ++i) {
				var c = text.value[i];

				if (c == '(') {
					arr.push(c);
				} else if (c == ')') {
					while (arr.length != 0 && arr[arr.length - 1] != '(') {
						output.push(arr[arr.length - 1]);
						arr.pop();
					}
					arr.pop();
				} else {
					if (!isOperator(c)) {
						//push number
						var index = i + 1;
						for (; index < text.value.length; ++index) {
							if (!isNum((text.value[index]))) {
								break;
							}
						}
						output.push(parseFloat(text.value.substring(i)));
						i = index - 1;
					} else {
						//verify unary operator or binary operator
						if (c == '-' &&
							(i == 0 || (!isNum(text.value[i - 1]) && text.value[i - 1] != ')'))) {
							output.push(0);
							arr.push(c);
						} else {
							while (arr.length != 0 && (priority(arr[arr.length - 1]) >= priority(c))) {
								output.push(arr[arr.length - 1]);
								arr.pop();
							}
							arr.push(c);
						}
					}
				}
			}

			while (arr.length != 0) {
				output.push(arr[arr.length - 1]);
				arr.pop();
			}

			// for (var s = 0; s < output.length; ++s) {
			// 	alert(output[s]);
			// }

			//evalue the postFixed expression
			var value = [];
			var x1, x2;

			for (var k = 0; k < output.length; ++k) {
				if (isNum(output[k])) {
					value.push(output[k]);
				} else if (output[k] == '+') {
					if (value.length < 2) {
						error = true;
						break;
					} else {
						x1 = value.pop() * 100000;
						x2 = value.pop() * 100000;
						value.push((x2 + x1) / 100000);
					}
				} else if (output[k] == '-') {
					if (value.length < 2) {
						error = true;
						break;
					} else {
						x1 = value.pop() * 100000;
						x2 = value.pop() * 100000;
						value.push((x2 - x1) / 10000);
					}
				} else if (output[k] == '*') {
					if (value.length < 2) {
						error = true;
						break;
					} else {
						x1 = value.pop() * 100000;
						x2 = value.pop() * 100000;
						value.push(x1 * x2 / 100000 / 100000);
					}
				} else if (output[k] == '/') {
					if (value.length < 2) {
						error = true;
						break;
					} else {
						x1 = value.pop() * 100000;
						x2 = value.pop() * 100000;
						if (x1 == 0) {
							alert("Divisor cannot be ZERO!");
							return;
						}
						value.push(x2 / x1);
					}
				}
			}

			if (error) {
				alert('Wrong expression!');
				return;
			} else {
				// 	try {
				// 		var answer = eval(text.value);
				// 		text.value = answer;
				// 		flag = true;
				// 	} catch (expression) {
				// 		alert('Wrong expression!');
				// 	}
				text.value = value[value.length - 1];
				flag = true;
			}
		}
	}
}