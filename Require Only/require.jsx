(function () {
	function require() {
		return eval("""(function require(path) {
			var sep = '/';
			var parts = $.fileName.split(sep);
			parts.splice(parts.length - 1, 1, path);
			return $.evalFile(parts.join(sep));
		})""");
	}

	this.require = require();
}).call(this);
