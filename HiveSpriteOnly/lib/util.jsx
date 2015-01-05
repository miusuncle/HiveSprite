var _      = require('../lib/underscore');
var JSON   = require('../lib/json2');
var moment = require('../lib/moment');

var global = $.global;

var prefs = (function () {
  return {
    originalRulerUnits: this.rulerUnits
  };
}).call(app.preferences);

function defaultPixels(func) {
  return function () {
    app.preferences.rulerUnits = Units.PIXELS;
    var ret = func.apply(null, arguments);
    app.preferences.rulerUnits = prefs.originalRulerUnits;
    return ret;
  };
}

var util = module.exports = {
  locale             : $.locale.split('_').shift(),
  localize           : _.bind(global.localize, global),

  alert              : _.bind(global.alert, global),
  confirm            : _.bind(global.confirm, global),
  prompt             : _.bind(global.prompt, global),

  isFile             : isFile,
  isFolder           : isFolder,
  isImageType        : isImageType,
  isFolderOrImageType: isFolderOrImageType,
  imageFilter        : imageFilter,
  textFilter         : textFilter,

  defaultPixels      : defaultPixels,
  newDocument        : newDocument,
  saveAsPNG          : saveAsPNG,
  exportAsPNG        : exportAsPNG,
  saveAsTextFile     : saveAsTextFile,

  inspect: function (obj) {
    this.alert(JSON.stringify(obj, null, 2));
  },

  inject: function (obj, name, value) {
    if (util.isPlainObject(name)) {
      _.extend(obj, name);
    } else {
      obj[name] = value;
    }

    return obj;
  },

  zhify: function () {
    return this.locale === 'zh';
  },

  readJSON: function (filePath) {
    var fileHandle = new File(filePath);
    var contents = null;

    if (fileHandle.exists) {
      try {
        fileHandle.open();
        contents = fileHandle.read();
      } finally {
        fileHandle.close();
      }
    }

    fileHandle = null;
    return JSON.parse(contents || null);
  },

  writeJSON: function (filePath, jsonVal) {
    var fileHandle = new File(filePath);
    var contents = JSON.stringify(jsonVal, null, 2);

    try {
      fileHandle.encoding = 'UTF8';
      fileHandle.lineFeed = File.fs;

      fileHandle.open('w');
      fileHandle.write(contents);
    } finally {
      fileHandle.close();
    }

    fileHandle = null;
    return contents;
  },

  platform: function () {
    return ({
      'Macintosh': 'osx',
      'Windows'  : 'windows'
    })[File.fs];
  }(),

  homeFolder: function () {
    return Folder.myDocuments.parent.fsName;
  }(),

  tempFolder: function () {
    return Folder.temp.fsName;
  }(),

  desktopFolder: function () {
    return Folder.desktop.fsName;
  }(),

  vsub: function (tmpl, vector) {
    return ('' + tmpl).replace(/\$\{([^\{\}]+)\}/g, function (k, p) {
      return _.has(vector, p) ? _.result(vector, p) : k;
    });
  },

  isPlainObject: function (target) {
    return Object.prototype.toString.call(target) === '[object Object]';
  },

  $: function (base, name) {
    return base.findElement(name);
  },

  titleCase: function (s) {
    return s[0].toUpperCase() + s.slice(1).toLowerCase();
  },

  strRepeat: function (str, qty) {
    if (qty < 1) return '';
    var result = '';
    while (qty > 0) {
      if (qty & 1) result += str;
      qty >>= 1, str += str;
    }
    return result;
  },

  disable: function (controls) {
    _.each([].concat(controls), function (ctrl) {
      ctrl.enabled = false;
    });
  },

  enable: function (controls) {
    _.each([].concat(controls), function (ctrl) {
      ctrl.enabled = true;
    });
  },

  disableRecursive: function _disable(ctrl) {
    if (ctrl.type !== 'item') {
      ctrl.enabled = false;
    }

    if (_.has(ctrl, 'children')) {
      _.each(_.result(ctrl, 'children'), _disable);
    }
  },

  enableRecursive: function _enable(ctrl) {
    ctrl.enabled = true;

    if (_.has(ctrl, 'children')) {
      _.each(_.result(ctrl, 'children'), _enable);
    }
  },

  getImages: function (folder) {
    if (!folder) return [];
    return folder.getFiles(isImageType) || [];
  },

  getAllImages: function gai(folder) {
    var result = folder.getFiles(isFolderOrImageType);
    return _.reduce(result || [], function (ret, target) {
      if (isImageType(target)) {
        ret.push(target);
      } else {
        ret.push.apply(ret, gai(target));
      }
      return ret;
    }, []);
  },

  newLayersFromFiles: function (specList) {
    // this method must work with current active document
    // so we check it first
    try { app.activeDocument; } catch (e) { return; }

    var keyfileList = app.stringIDToTypeID('fileList');
    var keyAddLayerFromFile = app.stringIDToTypeID('addLayerFromFile');

    var myFileList = _([].concat(specList)).reduce(function (ret, spec) {
      ret.putPath(new File(spec));
      return ret;
    }, new ActionList());

    var myOpenDescriptor = new ActionDescriptor();
    myOpenDescriptor.putList(keyfileList, myFileList);

    app.executeAction(keyAddLayerFromFile, myOpenDescriptor, DialogModes.NO);
  },

  fitOnScreen: function () {
    // this method must work with current active document
    // so we check it first
    try { app.activeDocument; } catch (e) { return; }

    var idslct = charIDToTypeID('slct');
    var desc3  = new ActionDescriptor();
    var idnull = charIDToTypeID('null');
    var ref1   = new ActionReference();
    var idMn   = charIDToTypeID('Mn  ');
    var idMnIt = charIDToTypeID('MnIt');
    var idFtOn = charIDToTypeID('FtOn');

    ref1.putEnumerated(idMn, idMnIt, idFtOn);
    desc3.putReference(idnull, ref1);

    app.executeAction(idslct, desc3, DialogModes.NO);
  },

  viewDocumentInActualSize: function () {
    // this method must work with current active document
    // so we check it first
    try { app.activeDocument; } catch (e) { return; }

    var idslct = app.charIDToTypeID('slct');
    var desc7  = new ActionDescriptor();
    var idnull = app.charIDToTypeID('null');
    var ref4   = new ActionReference();
    var idMn   = app.charIDToTypeID('Mn  ');
    var idMnIt = app.charIDToTypeID('MnIt');
    var idActP = app.charIDToTypeID('ActP');

    ref4.putEnumerated(idMn, idMnIt, idActP);
    desc7.putReference(idnull, ref4);

    app.executeAction(idslct, desc7, DialogModes.NO);
  }
};

function isFile(target) {
  return target instanceof File;
}

function isFolder(target) {
  return target instanceof Folder;
}

function isImageType(target) {
  return isFile(target) && /\.(?:jpg|jpeg|png|gif)$/i.test(target.name);
}

function isTextType(target) {
  return isFile(target) && /\.(?:txt|json)$/i.test(target.name);
}

function isFolderOrImageType(target) {
  return isFolder(target) || isImageType(target);
}

function isFolderOrTextType(target) {
  return isFolder(target) || isTextType(target);
}

function imageFilter() {
  switch (util.platform) {
  case 'osx':
    return isFolderOrImageType;
  case 'windows':
    return 'Image Files:*.JPG;*.JPEG;*.PNG;*.GIF';
  }
}

function textFilter() {
  switch (util.platform) {
  case 'osx':
    return isFolderOrTextType;
  case 'windows':
    return 'Text Files:*.txt;*.json';
  }
}

function newDocument(options) {
  options = _.defaults({}, options, {
    'width'           : 960,
    'height'          : 720,
    'resolution'      : 72,
    'name'            : 'Hive Sprite',
    'mode'            : NewDocumentMode.RGB,
    'initialFill'     : DocumentFill.TRANSPARENT,
    'pixelAspectRatio': 1,
    'bitsPerChannel'  : BitsPerChannelType.EIGHT,
    'colorProfileName': undefined
  });

  return app.documents.add(
    options.width,
    options.height,
    options.resolution,
    options.name,
    options.mode,
    options.initialFill,
    options.pixelAspectRatio,
    options.bitsPerChannel,
    options.colorProfileName
  );
}

function saveAsPNG(doc, where) {
  var filename = [
    'HiveSprite',
    moment().format('YYYY-MM-DD'),
    (+String(Math.random()).slice(2)).toString(16)
  ].join('-');

  var saveIn = new File([where, filename].join('/'));

  var pngSaveOptions = new PNGSaveOptions;
  pngSaveOptions.compression = 9;
  pngSaveOptions.interlaced = false;

  var asCopy = true;
  var extensionType = Extension.LOWERCASE;

  doc.saveAs(saveIn, pngSaveOptions, asCopy, extensionType);
}

function exportAsPNG(doc, where) {
  // var rand = (+String(Math.random()).slice(2)).toString(16);

  var filename = [
    'HiveSprite',
    moment().format('MM-DD'),
    Date.now() + '.png'
  ].join('-');

  var destination   = [where, filename].join('/');
  // util.alert(destination);

  var exportIn      = new File(destination);
  var exportAs      = ExportType.SAVEFORWEB;
  var exportOptions = new ExportOptionsSaveForWeb;

  _.extend(exportOptions, {
    'format'        : SaveDocumentType.PNG,
    'PNG8'          : false,
    'transparency'  : true,
    'includeProfile': false,
    'interlaced'    : false
  });

  doc.exportDocument(exportIn, exportAs, exportOptions);
  return filename;
}

function saveAsTextFile(text, where) {
  var filename = [
    'HiveCSS',
    moment().format('MM-DD'),
    Date.now() + '.css'
  ].join('-');

  var destination = [where, filename].join('/');
  // util.alert(destination);

  var file = new File(destination);

  file.encoding = 'UTF8';
  file.lineFeed = File.fs;

  file.open('w');
  file.write(text);
  file.close();

  return filename;
}
