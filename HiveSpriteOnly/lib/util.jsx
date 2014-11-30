var _      = require('../lib/underscore');
var JSON   = require('../lib/json2');
var moment = require('../lib/moment');

var prefs = (function () {
  return {
    originalRulerUnits: this.rulerUnits
  };
}).call(app.preferences);

var newDocument = _.wrap(newDocument, _.bind(function (original) {
  this.rulerUnits = Units.PIXELS;
  var ret = original.apply(null, _.rest(arguments));
  this.rulerUnits = prefs.originalRulerUnits;
  return ret;
}, app.preferences));

var util = module.exports = {
  isFile             : isFile,
  isFolder           : isFolder,
  isImageType        : isImageType,
  isFolderOrImageType: isFolderOrImageType,
  dialogFilter       : dialogFilter,
  newDocument        : newDocument,
  saveAsPNG          : saveAsPNG,
  exportAsPNG        : exportAsPNG,
  saveAsTextFile     : saveAsTextFile,

  inspect: function (obj) {
    alert(JSON.stringify(obj, null, 2));
  },

  platform: function () {
    return ({
      'Macintosh': 'osx',
      'Windows': 'windows'
    })[File.fs];
  }(),

  tempFolder: function () {
    return Folder.temp.fsName;
  }(),

  vsub: function (tmpl, vector) {
    return ('' + tmpl).replace(/\$\{([^\{\}]+)\}/g, function (_, p) {
      return (vector || {})[p] || '';
    });
  },

  $: function (base, name) {
    return base.findElement(name);
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

  getImages: function (folder) {
    if (!folder) return [];
    return folder.getFiles(isFolderOrImageType) || [];
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
  }
};

function isFile(target) {
  return target instanceof File;
}

function isFolder(target) {
  return target instanceof Folder;
}

function isImageType(target) {
  return isFile(target) && /\.(jpg|jpeg|png|gif)$/i.test(target.name);
}

function isFolderOrImageType(target) {
  return isFolder(target) || isImageType(target);
}

function dialogFilter() {
  switch (util.platform) {
  case 'osx':
    return isFolderOrImageType;
  case 'windows':
    // TODO: add file type filter
    return '';
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
    moment().format("YYYY-MM-DD"),
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
  // alert(destination);

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
}

function saveAsTextFile(text, where) {
  var filename = [
    'HiveCSS',
    moment().format('MM-DD'),
    Date.now() + '.css'
  ].join('-');

  var destination = [where, filename].join('/');
  // alert(destination);

  var file = new File(destination);

  file.encoding = 'UTF8';
  file.lineFeed = 'Unix';

  file.open('w');
  file.write(text);
  file.close();
}
