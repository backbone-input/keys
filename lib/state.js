// extend existing params
var state = View.prototype.state || new Backbone.Model();

// defaults
state.set({
	keypress: false
});
