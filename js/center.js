var app = app || {};

app.Center = function(options) {
	var self = this,
      lib = app.Lib,
      elem = options.elem;

  var toggleList = function(event) {
   var target, empls;

   event = event || window.event;
   target = event.target || event.srcElement;

   if(target.tagName.toLowerCase() !== "span") {
     return;
   }

   empls = target.parentNode.getElementsByTagName("ul")[0];

   if(empls) {
     lib.toggleClass(empls, "show");	
   }

 };  

 this.init = function() {
  elem.onclick = toggleList;
};

};