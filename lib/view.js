

	var Keys = View.extend({

		options: {
			monitor: [], // add "keys" to initiate monitoring
			keys: {
				pause: [] // limit the effect of these keys (temporarily)
			}
		},

		params: params,

		// Allow pr view what specific event to use
		// Keydown is defaulted as it allows for press-and-hold
		bindKeysOn : ['keydown', 'keyup'],

		// The Backbone-y way would be to have
		// keys scoped to `this.el` as default,
		// however it would be a bigger surprise
		// considering how you'd expect keyboard
		// events to work
		// But users should be able to choose themselves
		bindKeysScoped : false,

		// The actual element to bind events to
		bindTo : null,

		// Hash of bound listeners
		_keyEventBindings : null,

		// internal container for keys
		_keys: {},

		// Override delegate events
		delegateEvents : function() {
			oldDelegateEvents.apply(this, Array.prototype.slice.apply(arguments));
			this.delegateKeys();
			return this;
		},

		// Clears all callbacks previously bound to the view with `delegateEvents`.
		// You usually don't need to use this, but may wish to if you have multiple
		// Backbone views attached to the same DOM element.
		undelegateEvents: function() {
			this.undelegateKeys();
			oldUndelegateEvents.apply(this, arguments);
			return this;
		},

		// Actual delegate keys
		delegateKeys : function(keys) {
			var self = this;

			this.undelegateKeys();

			if (!this.bindTo) {
				this.bindTo = (this.bindKeysScoped || typeof $ === "undefined") ? this.$el : $(document);
			}
			_.each( this.bindKeysOn, function( bind ){
				self.bindTo.on(bind + '.delegateKeys' + self.cid, _.bind(self.triggerKey, self));
			});

			keys = keys || (this.keys);
			if (keys) {
				this._keys = parseKeys( keys );
				_.each(keys, function(method, key) {
					this.keyOn(key, method);
				}, this);
			}
			return this;
		},

		// Undelegate keys
		undelegateKeys : function() {
			var self = this;

			this._keyEventBindings = {};
			if (this.bindTo) {
				_.each( this.bindKeysOn, function( bind ){
					self.bindTo.off(bind + '.delegateKeys' + self.cid);
				});
			}
			return this;
		},

		// Utility to get the name of a key
		// based on its keyCode
		keyName : function(keyCode) {
			var keyName;
			for (keyName in BackboneKeysMap)
				if (BackboneKeysMap[keyName] === keyCode) return keyName;
			return String.fromCharCode(keyCode);
		},

		// Internal real listener for key events that
		// forwards any relevant key presses
		triggerKey : function(e) {
			var key;
			if (_.isObject(e)) key = e.which;
			else if (_.isString(e)) key = getKeyCode(e);
			else if (_.isNumber(e)) key = e;

			_(this._keyEventBindings[key]).each(function(listener) {
				var trigger = true;
				if (listener.modifiers) {
					trigger = _(listener.modifiers).all(function(modifier) {
						return e[modifier + 'Key'] === true;
					});
				}
				if (trigger) listener.method(e, listener.key);
			});
			return this;
		},

		// Doing the real work of binding key events
		keyOn : function(key, method) {
			key = key.split(' ');
			if (key.length > 1) {
				var l = key.length;
				while (l--)
					this.keyOn(key[l], method);
				return;
			}
			else key = key.pop().toLowerCase();

			// Subtract modifiers
			var components = key.split('+');
			key = components.shift();

			// add the key in the params
			var params = this.params.get("keys");
			params[key] = true;
			this.params.set({ keys: params });
			//
			var keyCode = getKeyCode(key);

			if (!this._keyEventBindings.hasOwnProperty(keyCode)) {
				this._keyEventBindings[keyCode] = [];
			}

			if (!_.isFunction(method)) method = this[method];

			this._keyEventBindings[keyCode].push({
				key : key,
				modifiers : (components || false),
				method: _.bind(method, this)
			});
			return this;
		},

		keyOff : function(key, method) {
			method = (method || false);
			if (key === null) {
				this._keyEventBindings = {};
				return this;
			}
			// remove the key from the params
			var params = this.params.get("keys");
			delete params[key];
			this.params.set({ keys: params });
			//
			var keyCode = getKeyCode(key);
			if (!_.isFunction(method)) method = this[method];
			if (!method) {
				this._keyEventBindings[keyCode] = [];
				return this;
			}
			this._keyEventBindings[keyCode] = _.filter(
				this._keyEventBindings[keyCode],
				function(data, index) {
					return data.method === method;
				}
			);
			return this;
		},

		remove: function(){
			// undelegate keys
			this.undelegateKeys();
			return View.prototype.remove.apply(this, arguments);
		}
	});
