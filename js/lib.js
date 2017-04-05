;
var Q = function(selector) {
	return new Q.fn(selector);
}

Q.fn = function (selector) {
	this.elems = document.querySelectorAll(selector);
	return this;
}

Q.fn.prototype.getElement = function (n) { 
	return this.elems[n];
}

Q.fn.prototype.html = function(htmlStr) {
	if (htmlStr === undefined) { 
		var a = [];
		this.elems.forEach( function(elem, key) {
		a[key] = elem.innerHTML;
		});
		return a;
	}

	this.elems.forEach( function(elem) {
		elem.innerHTML = htmlStr;
	});
}

Q.fn.prototype.text = function (text) {
	if (text === undefined) { 
		var a = [];
		this.elems.forEach( function(elem, key) {
		a[key] = elem.textContent;
		});
		return a;
	}

	this.elems.forEach( function(elem) {
		elem.textContent = text;
	});
};

Q.fn.prototype.value = function (value) {
	if (value === undefined) { 
		var a = [];
		this.elems.forEach( function(elem, key) {
		a[key] = elem.value;
		});
		return a;
	}

	this.elems.forEach( function(elem) {
		elem.setAttribute('value', value);
	});
};

Q.fn.prototype.onclick = function(fn){
	if (!fn) {return false;}
	if ((typeof fn) !== "function") {return false;}

	this.elems.forEach( function(elem) {
		elem.addEventListener('click',fn);
	});
	return true;
};

Q.fn.prototype.append = function(tag, addClass, htmlStr) {
	var el = document.createElement(tag);
	if (addClass !== undefined) {
		el.className = addClass;
	}
	if (htmlStr !== undefined) {
		el.innerHTML = htmlStr;
	}

	this.elems.forEach( function(elem) {
		elem.appendChild(el);
	});
}

Q.fn.prototype.delete = function() {
	this.elems.forEach( function(elem) {
		elem.parentNode.removeChild(elem);
	});
}

Q.fn.prototype.css = function(property, value){
	this.elems.forEach( function(elem) {
		elem.style[property] = value;
	});
};