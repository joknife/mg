;
Q('#lg-display').value("");

var secret = [],
		colors = ['white', 'black', 'red', 'green', 'blue', 'yellow'],
		count = 0,
		maxSteps = 10,
		offsetX = -120,
		offsetY = -10,
		item,
		answer = [],
		collItems = Q('.c-item').elems,
		collBoard = Q('.coll').elems[0];

collItems.forEach( function(elem, i) {
	elem.style.backgroundColor = colors[i];
});
collBoard.style.display = 'none';


var start =function() {
	count = 1;
	secret =[];
	clearBoard();
	Q('#lg-display').value("");

	for (var i = 1; i < 7; i++) {
		secret.push(i);
	}
	secret = shuffle(secret);
	secret.length = 4;
	this.textContent = 'Заново';
	Q('.s').text('?');
}

var choose =function() {
	var i = this.id[1];

	if (answer.indexOf(i) !== -1) { return false;}

	answer[item.id[1] - 1] = i;
	item.style.backgroundColor = colors[i-1];
	collBoard.style.display = 'none';
	return true;
}

var showColl = function(e) {
	if (count === 0) {return false;}
	if (+this.id[2] !== count) {return false;}

	item = this;
	var x = e.clientX + offsetX,
			y = e.clientY + offsetY;
	
	if (collBoard.style.display === 'block'){
		collBoard.style.display = 'none';
	} else {
		collBoard.style.top = y + 'px';
		collBoard.style.left = x + 'px';
		collBoard.style.display = 'block';
	}
}

var move = function() {
	if (count === 0) {return false;}
	var hint = [], 
		points = 0;

	for (var i = 3; i >= 0; i--) {
		if (!answer[i]){ return false;}
	}

	for (var i = 3; i >= 0; i--) {
		for (var j = 3; j >= 0; j--){
			if (+answer[i] === +secret[j]) {
				hint.push(1);
				if (i === j) {
					hint[hint.length - 1]++;
				}
			}
		}
	}

	hint = hint.sort();
	showHint(hint);
	hint.forEach( function(elem) {
		!elem || (points += elem);
	});
	if (points === 8) {
		win();
		return
	}
	if (count === maxSteps){
		loose();
		return;
	}

	count++;
	answer.length = 0;
	nextBoard();
}

Q('#start').onclick(start);
Q('.item').onclick(showColl);
Q('.c-item').onclick(choose);
Q('#done').onclick(move);


// helpers //

function showHint(hint) {
	var items = '';
	for (var i = hint.length - 1; i >= 0; i--) {
		items = items + "<div class='hint' style ='background-color:"
						+ colors[hint[i] - 1] + "'></div>";
	}
	Q('.lg-field').append('div', 'h-board', items);
	return;
}

function win() {
	Q('#lg-display').value('Вам удалось!');
	count = 0;
	return;
}

function loose() {
	var el;
	for (var i = 0; i < 4; i++) {
		el = Q('.s').getElement(i);
		el.style.backgroundColor = colors[secret[i]-1];
	}
	Q('#lg-display').value('Больше нет попыток!');
	count = 0;
	return;
}

function nextBoard() {
	var items = '';
	for (var i = 1; i < 5; i++) {
		items = items + "<div class='item' id ='i"
						+ i + '' + count + "'></div>";
	}
	Q('.lg-field').append('div', 'board add', items);
	Q('.item').onclick(showColl);
}

function clearBoard() {
	Q('.s').css('backgroundColor', "");
	Q('.item').css('backgroundColor', "");
	Q('.h-board').delete();
	Q('.add').delete();
	return true;
}

function shuffle(arr) {
	arr = arr.sort(function() {
		return (Math.random() - 0.5);
	});
	return arr;
}

function getRandomInt(min,max) {
	return Math.floor( Math.random() * (max - min + 1) + min );
}