var app = app || {};

(function() {
	var list = document.querySelector(".list"),
			center = new app.Center({
				elem: list
			});

	center.init();

	var dragManager = new app.DragManager({
		elem: list
	});

	dragManager.init();
}());