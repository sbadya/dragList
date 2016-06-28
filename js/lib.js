var app = app || {};

app.Lib = {
	addClass: function(elem, cls) {
		var i, 
				len, 
				classList = elem.className.split(" ");

		for(i = 0, len = classList.length; i < len; i+=1) {
			if(classList[i] === cls) {
				return;
			}
		}

		classList.push(cls);
		elem.className = classList.join(" ");
		return cls;
	},
	removeClass: function(elem, cls) {
		var i, 
				len, 
				classList = elem.className.split(" ");

		for(i = 0, len = classList.length; i < len; i+=1) {
			if(classList[i] === cls) {
				classList.splice(i, 1);
				i--;
			}
		}

		elem.className = classList.join(" ");
		return cls;
	},
	hasClass: function(elem, cls) {
		var i, 
				len, 
				classList = elem.className.split(" ");

		for(i = 0, len = classList.length; i < len; i+=1) {
			if(classList[i] === cls) {
				return true;
			}
		}

		return false;
	},
	toggleClass: function(elem, cls) {
		if(this.hasClass(elem, cls)) {
  		this.removeClass(elem, cls);
  	} else {
  		this.addClass(elem, cls);
  	}
	},
	getCoords: function(elem) {
		var box = elem.getBoundingClientRect();

		return {
			top: box.top + this.getScroll().scrollTop,
			left: box.left + this.getScroll().scrollLeft
		};
	},
	getScroll: function() {
		var srollTop,
				scrollLeft,
				body = document.body;

		scrollTop = window.pageYOffset || (body && body.scrollTop) || 0;
		scrollLeft = window.pageXOffset || (body && body.scrollLeft) || 0;

		return {
			scrollTop: scrollTop,
			scrollLeft: scrollLeft
		};		
	},
	defineLevel: function(dragElem, dropElem) {
		var dragLevel = 0,
				dropLevel = 0,
				html = document.documentElement;

		while(dragElem !== html) {
			dragLevel++;
			dragElem = dragElem.parentNode;
		}

		while(dropElem !== html) {
			dropLevel++;
			dropElem = dropElem.parentNode;
		}

		if(dropLevel < dragLevel) {
			return -1;
		} else if(dropLevel > dragLevel) {
			return 1
		}

		return 0;
	}
};