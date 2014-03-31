
	// Map keyname to keycode
	var BackboneKeysMap = {
		backspace: 8,
		tab: 9,
		enter: 13,
		space: 32,

		// Temporal modifiers
		shift: 16,
		ctrl: 17,
		alt: 18,
		meta: 91,

		// Modal
		caps_lock: 20,
		esc: 27,
		num_lock: 144,

		// Navigation
		page_up: 33,
		page_down: 34,
		end: 35,
		home: 36,
		left: 37,
		up: 38,
		right: 39,
		down: 40,

		// Insert/delete
		insert: 45,
		'delete': 46,

		// F keys
		f1: 112,
		f2: 113,
		f3: 114,
		f4: 115,
		f5: 116,
		f6: 117,
		f7: 118,
		f8: 119,
		f9: 120,
		f10: 121,
		f11: 122,
		f12: 123
	};

	// Aliased names to make sense on several platforms
	_.each({
		'options' : 'alt',
		'return': 'enter'
	}, function(real, alias) {
		BackboneKeysMap[alias] = BackboneKeysMap[real];
	});
