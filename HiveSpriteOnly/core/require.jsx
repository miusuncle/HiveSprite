!(function () {
  var MODULE_CACHES = {};
  var DIR_QUEUE = [];

  function rel2abs(mid, filename, _) {
    mid = mid.replace(/^\.\//, '');

    if (DIR_QUEUE.length) {
      _ = DIR_QUEUE.slice(-1).concat(mid);
    } else {
      _ = filename.split('/');
      _.splice(_.length - 1, 1, mid);
    }

    return normpath(_.join('/'));
  }

  function normpath(path) {
    while (path.indexOf('/../') !== -1) {
      path = path.replace(/[^\/]+\/\.{2}\//, '');
    }
    return File.decode(path);
  }

  function getFile(mid) {
    var fileHandle = File(mid);
    var exts = ['.jsx', '.js'];

    while (!fileHandle.exists || isFolder(fileHandle)) {
      var ext = exts.shift();
      if (!ext) throw Error(File.decode(mid) + ' is NOT a MODULE!');
      fileHandle = new File(mid + ext);
    }

    return fileHandle;
  }

  function isFolder(target) {
    return target instanceof Folder;
  }

  function readFile(file) {
    try {
      return file.open('r') && file.read() || '';
    } finally {
      file.close();
    }
  }

  function buildRequire() {
    return eval("""(function require(mid) {
      var moduleId = rel2abs(mid, $.fileName);
      if (moduleId in MODULE_CACHES) return MODULE_CACHES[moduleId];

      try {
        var exports = function () {};
        var module = { 'exports': exports };

        var fileHandle = getFile(moduleId);
        var contents = readFile(fileHandle);
        var func = new Function('require, exports, module', contents);

        DIR_QUEUE.push(fileHandle.path);
        func(require, exports, module);
        DIR_QUEUE.pop();

        fileHandle = null;
        moduleId = moduleId.replace(/\.jsx?$/, '');

        return (MODULE_CACHES[moduleId] = (module || {}).exports);
      } catch (e) {
        alert(e.message);
      }
    })""");
  }

  this.require = buildRequire();
}).call($.global);
