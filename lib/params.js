// extend existing params
var params = View.prototype.params || new Backbone.Model();

// defaults
params.set({
	keys: {} // a list of all the keys pressed
});