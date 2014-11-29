!(function () {
  var global = this;

  var MODULE_CACHES = {};
  var SHIM = {};
  var DIR_QUEUE = [];

  var EXT = /\.jsx?$/;
  var WAP = '_wrapped';
  var SEP = '/';

  function normpath(path) {
    while (path.indexOf('/../') !== -1) {
      path = path.replace(/[^\/]+\/\.{2}\//, '');
    }
    return path;
  }

  function wrap(contents) {
    var prefix = '!(function (require, exports, module) {';
    var suffix = '}).call(global, require, exports, module);';
    return [prefix, contents, suffix].join('\n');
  }

  function haswrap(path) {
    var parts = path.split(SEP);
    return RegExp(WAP + '(\.jsx?)?$').test(parts.pop());
  }

  function wrapmid(F) {
    var mid = '#' + Date.now() + '@' + F.name.replace(EXT, WAP + '$&');
    return [Folder.temp, mid].join(SEP);
  }

  function mixin(target, source, _) {
    for (_ in source) target[_] = source[_];
  }

  function isfolder(target) {
    return target instanceof Folder;
  }

  function require() {
    return global['eval'].call(global, """(function require(moduleId) {
      var filepath = $.fileName, parts;

      if (moduleId.indexOf('./') === 0) {
        moduleId = moduleId.slice(2);
      }

      if (haswrap(filepath)) {
        parts = DIR_QUEUE.slice(-1).concat(moduleId);
      } else {
        parts = filepath.split(SEP);
        parts.splice(parts.length - 1, 1, moduleId);
      }

      moduleId = normpath(parts.join(SEP));
      moduleId = File.decode(moduleId);

      return MODULE_CACHES[moduleId] || (function () {
        try {
          var nakedFile = File(moduleId);
          var exts = ['.jsx', '.js'];

          while (!nakedFile.exists || isfolder(nakedFile)) {
            var extension = exts.shift();

            if (!extension) {
              throw Error(File.decode(moduleId) + ' is NOT a MODULE!');
              return;
            }

            nakedFile = new File(moduleId + extension);
          }

          moduleId = nakedFile.fullName;

          var module = { exports: function () {} };
          var basename = nakedFile.displayName.split('.')[0];

          if (SHIM[basename]) {
            $.evalFile(moduleId);
            module.exports = this[SHIM[basename]];
          } else {
            DIR_QUEUE.push(nakedFile.path);

            nakedFile.open('r');
            var wrappedContents = wrap(nakedFile.read());
            nakedFile.close();

            var wrappedFile = new File(wrapmid(nakedFile));
            wrappedFile.open('w');
            wrappedFile.write(wrappedContents);
            wrappedFile.close();

            try {
              with (module) { $.evalFile(wrappedFile); }
            } finally {
              wrappedFile.remove();
              DIR_QUEUE.pop();
            }
          }

          // the module id being cached SHOULD have no extension
          moduleId = moduleId.replace(EXT, '');

          return (MODULE_CACHES[moduleId] = (module || {}).exports);
        } catch (e) {
          alert(e.message);
        }
      })();
    })""");
  }

  mixin(SHIM, (global.require = require())('./_shim'));
}).call($.global);
