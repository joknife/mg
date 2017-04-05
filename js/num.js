;
Q('#num-display').value("");

var handl,
	maxTime = 45,
	t = maxTime,
	initArr = [],
	number = 0,
	colors = ["purple","fuchsia","teal","red","blue",
						"aqua","green","lime","olive","orange"];

for(var i = 0; i < 25; i++){
	initArr.push(i+1);
}

var loose = function() {
	number = 0;
	clearInterval(handl);
	Q('#num-display').value('Вы не успели!');
}

var win = function() {
	number = 0;
	clearInterval(handl);
	Q('#num-display').value('Вы справились!');
}

var timer = function(max) {
	if (t === 0) { loose(); return;}
	Q('#num-display').value('Осталось :' + t + 'c');
	t--;
}

var start = function() {
	initArr = shuffle(initArr);
	var items = Q('.num-item').elems;
	Q('button').text('Заново');
	items.forEach( function(elem, index) {
		elem.style.color = colors[getRandomInt(0,9)];
		elem.style.fontSize = getRandomInt(18,42) + 'px';
		elem.textContent = initArr[index];
	});
	t = maxTime;
	handl = setInterval(timer, 1000);
	number = 1;
}

var move = function() {
	if (number === 0){return false;}

	if (+this.textContent != number){
		t-=3;
		return false;
	}

	this.style.backgroundColor = '#5555fa';
	if (number++ === 25){
		win();
	}
}


Q('button').onclick(start);
Q('.num-item').onclick(move);

function shuffle(arr) {
	arr = arr.sort(function() {
		return (Math.random() - 0.5);
	});
	return arr;
}

function getRandomInt(min,max) {
	return Math.floor( Math.random() * (max - min + 1) + min );
}