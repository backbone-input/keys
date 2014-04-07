	// Private helpers
	var getKeyCode = function(key) {
		return (key.length === 1) ?
			key.toUpperCase().charCodeAt(0) : BackboneKeysMap[key];
	};

	var parseKeys = function(keyset) {
		var data = {};
		_.each(keyset, function(method, keys) {
			// convert to lowercase
			keys = keys.toLowerCase();
			// convert to array
			keys = keys.split(' ');
			// save with method as the key
			data[method] = keys;
		}, this);

		return data;
	};
