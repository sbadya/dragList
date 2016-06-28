var app = app || {};

app.DragManager = function(options) {
	var elem = options.elem,
			lib = app.Lib,

			avatar = {
				moveInArea: function(event) {
					var left = event.clientX + lib.getScroll().scrollLeft - shiftX,
							top = event.clientY + lib.getScroll().scrollTop - shiftY;
					
					if(left < elem.leftX) {
						left = elem.leftX + "px";
					}
					
					if(left + this.elem.offsetWidth > elem.rightX) {
						left = elem.rightX - this.elem.offsetWidth;
					}	

					if(top < elem.leftY) {
						top = elem.leftY + "px";
					}

					if(top + this.elem.offsetHeight > elem.rightY) {
						top = elem.rightY - this.elem.offsetHeight;
					}

					this.elem.style.left = left + "px";
					this.elem.style.top = top + "px";
				},
				create: function(elem) {
					var clone = elem.cloneNode(true);
					lib.addClass(clone, "avatar");
					return clone;
				}
			};


	var shiftX,
			shiftY,
			downX,
			downY,
			isDownPressed;

	this.init = function() {	
		elem.onmousedown = dragDown;
		document.onmousemove = dragMove;
		document.onmouseup = dropUp;
		document.ondragstart = function() {
			return false;
		};
	};

	function dragDown(event) {

		var event = event || window.event,
				target = event.target || event.srcElement;

		if(event.which !== 1) {
			return;
		}

		if(target.tagName.toLocaleLowerCase() !== "span") {
			return;
		}

		elem.leftX = lib.getCoords(elem).left + lib.getScroll().scrollLeft,
		elem.leftY = lib.getCoords(elem).top + lib.getScroll().scrollTop;
		elem.rightX = elem.leftX + elem.offsetWidth;
		elem.rightY = elem.leftY + elem.offsetHeight;

		downX = event.clientX + lib.getScroll().scrollLeft;
		downY = event.clientY + lib.getScroll().scrollTop;

		shiftX = downX - lib.getCoords(target).left;
		shiftY = downY - lib.getCoords(target).top;

		isDownPressed = true;

		return false;
	}

	function dragMove(event) {

		var event = event || window.event,
				target = event.target || event.srcElement;

		if(!isDownPressed) {
			return;
		}

		if(!avatar.elem) {
			avatar.elem = avatar.create(target);
			avatar.sourceElem = target;

			avatar.elem.style.left = lib.getCoords(target).left + "px";
			avatar.elem.style.top = lib.getCoords(target).top + "px";
			document.body.appendChild(avatar.elem);
		}


		avatar.moveInArea(event);
	}

	function dropUp(event) {
	
		var event = event || window.event,
				target = event.target || event.srcElement,
				currentDroppable,
				currentDraggable,
				parentDroppable,
				parentDraggable,
				siblingDroppable,
				siblingDraggable,
				level;

		if(avatar.elem) {
			document.body.removeChild(avatar.elem);		
			delete avatar.elem;

			currentDraggable = avatar.sourceElem.parentNode;
			currentDroppable = document.elementFromPoint(event.clientX, event.clientY);

			if(!currentDroppable || currentDroppable.tagName.toLowerCase() !== "span") {
				isDownPressed = false;
				return;
			}

			
			currentDroppable = currentDroppable.parentNode;


			parentDraggable = currentDraggable.parentNode;
			parentDroppable = currentDroppable.parentNode;

			parentDraggable.insertBefore(document.createTextNode(""), currentDraggable.nextSibling);
			parentDroppable.insertBefore(document.createTextNode(""), currentDroppable.nextSibling);

			siblingDraggable = currentDraggable.nextSibling;
			siblingDroppable = currentDroppable.nextSibling;
			
			level = lib.defineLevel(currentDraggable, currentDroppable);

			if(level === 0) {
				currentDroppable = parentDroppable.removeChild(currentDroppable);
				parentDroppable.insertBefore(currentDraggable, siblingDroppable);
				parentDraggable.insertBefore(currentDroppable, siblingDraggable);
			} else if(level === -1) {
					currentDraggable = parentDraggable.removeChild(currentDraggable);
					currentDroppable.getElementsByTagName("ul")[0].appendChild(currentDraggable);
			}
			
		}

		isDownPressed = false;		
	}
};