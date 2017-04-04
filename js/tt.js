;
//window.onload = Q('#tt-display').value("");
Q('#tt-display').value("");

var items = [],
	sign = ['X', 'O'],
	move = 0,
	game = false;

var start = function() {
	items.length = 0;
	Q('.tt-item').text("");
	move = 0;
	game = true;
	Q('button').text('Заново');
	Q('#tt-display').value('Ход: ' + sign[+move]);
}

var isWin =function() {
	for (var i = 0; i < 3; i++){
		if (items[i] !== undefined && items[i] === items[i+3] && items[i+3] === items[i+6]) {
			return true;
		}
		if (items[i*3] !== undefined && items[i*3] === items[i*3+1] && items[i*3+1] === items[i*3+2]) {
		return true;
		}
	}

	if (items[0] !== undefined && items[0] === items[4] && items[4] === items[8]) { 
		return true;
	}

	if (items[2] !== undefined && items[2] === items[4] && items[4] === items[6]) {
		return true; 
	}

	return false;
}

var mov = function() {
	if (!game || this.textContent !== "") { return false};

	var num = this.id[1] - 1;
	items[num] = +move;

	this.textContent = sign[+move];
	Q('#tt-display').value('Ход: ' + sign[+move]);

	if (isWin()) {
		game = false;
		Q('#tt-display').value('Победа: ' + sign[+move]);
		return false;
	}
	move=!move;
	console.log(items);
}

Q('button').onclick(start);
Q('.tt-item').onclick(mov);