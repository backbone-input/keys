/**
 * @name {{name}}
 * {{description}}
 *
 * Version: {{version}} ({{build_date}})
 * Homepage: {{homepage}}
 *
 * @author {{author}}
 * Created by: Makis Tracend (@tracend)
 *
 * @cc_on Copyright © Makesites.org
 * @license Dual-licensed: {{#license licenses}}{{/license}}
 */

(function(w, _, Backbone, APP) {
	//"use strict";

	// Alias the libraries from the global object
	var oldDelegateEvents = Backbone.View.prototype.delegateEvents;
	var oldUndelegateEvents = Backbone.View.prototype.undelegateEvents;

	var isAPP = ( typeof APP !== "undefined" && typeof APP.View !== "undefined" );
	var View = ( isAPP ) ? APP.View : Backbone.View;


{{{lib}}}


	// fallbacks
	if( _.isUndefined( Backbone.Input ) ) Backbone.Input = {};
	Backbone.Input.Keys = Keys;

	// Support module loaders
	if ( typeof module === "object" && module && typeof module.exports === "object" ) {
		// Expose as module.exports in loaders that implement CommonJS module pattern.
		module.exports = Keys;
	} else {
		// Register as a named AMD module, used in Require.js
		if ( typeof define === "function" && define.amd ) {
			define( [], function () { return Keys; } );
		}
	}
	// If there is a window object, that at least has a document property
	if ( typeof window === "object" && typeof window.document === "object" ) {
		// update APP namespace
		if( isAPP ){
			APP.View = Keys;
			APP.Input = APP.Input || {};
			APP.Input.Keys = Backbone.Input.Keys;
			// save namespace
			window.APP = APP;
		} else {
			// update Backbone namespace
			Backbone.View = Keys;
		}
		// save Backbone namespace either way
		window.Backbone = Backbone;
	}


})(this.window, this._, this.Backbone, this.APP);
