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

(function (factory) {
	"use strict";

	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['underscore', 'backbone', 'jquery'], factory);
	} else {
		// Browser globals
		factory(_, Backbone, $);
	}
}(function (_, Backbone, $) {
	"use strict";

	// Alias the libraries from the global object
	var oldDelegateEvents = Backbone.View.prototype.delegateEvents;
	var oldUndelegateEvents = Backbone.View.prototype.undelegateEvents;


{{{lib}}}


	return Backbone;
}));
