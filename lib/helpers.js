	var getKeyCode = function(key) {
		return (key.length === 1) ?
			key.toUpperCase().charCodeAt(0) : BackboneKeysMap[key];
	};
