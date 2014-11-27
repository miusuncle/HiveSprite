!(function () {
  var global = this;
  var MODULE_CACHES = {};

  var shims = {
    'underscore': '_'
  };

  function normpath(path) {
    while (path.indexOf('/../') !== -1) {
      path = path.replace(/[^\/]+\/\.{2}\//, '');
    }
    return path;
  }

  function endswith(str, pattern) {
    var d = str.length - pattern.length;
    return d >= 0 && str.indexOf(pattern, d) === d;
  }

  function wrap(contents) {
    var prefix = '!(function (module, exports) {';
    var suffix = '}).call(global, module, exports);';
    return [prefix, contents, suffix].join('\n');
  }

  function require() {
    return global['eval'].call(global, """(function require(moduleId) {
      var sep = '/', ext = '.jsx', cur = './';

      if (moduleId.indexOf(cur) === 0) {
        moduleId = moduleId.slice(2);
      }

      if (!endswith(moduleId, ext)) {
        moduleId += ext;
      }

      var parts = $.fileName.split(sep);
      parts.splice(parts.length - 1, 1, moduleId);
      moduleId = normpath(parts.join(sep));

      return MODULE_CACHES[moduleId] || (function () {
        try {
          var nakedFile = new File(moduleId);

          if (!nakedFile.exists) {
            throw Error(File.decode(nakedFile) + ' is NOT a MODULE!');
            return;
          }

          var module = { exports: function () {} };
          var basename = nakedFile.displayName.split('.')[0];

          if (shims[basename]) {
            $.evalFile(moduleId);
            module.exports = this[shims[basename]];
          } else {
            nakedFile.open('r');

            var contents = wrap(nakedFile.read());
            nakedFile.close();

            var wrappedModuleId = moduleId.replace(/\.jsx?$/, '_wrapped$&');
            var wrappedFile = new File(wrappedModuleId);

            wrappedFile.open('w');
            wrappedFile.write(contents);
            wrappedFile.close();

            try {
              with (module) { $.evalFile(wrappedFile); }
            } finally {
              wrappedFile.remove();
            }
          }

          return (MODULE_CACHES[moduleId] = module.exports);
        } catch (e) {
          alert(e.message);
        }
      })();
    })""");
  }

  global.require = require();
}).call($.global);
