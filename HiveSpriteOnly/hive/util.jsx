var _    = require('../lib/underscore');
var JSON = require('../lib/json2');

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

module.exports = {
  isFile             : isFile,
  isFolder           : isFolder,
  isImageType        : isImageType,
  isFolderOrImageType: isFolderOrImageType,
  dialogFilter       : dialogFilter,
  newDocument        : newDocument,

  inspect: function (obj) {
    alert(JSON.stringify(obj, null, 2));
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
    return folder.getFiles(isFolderOrImageType) || [];
  },

  getAllImages: function gai(folder) {
    var result = folder.getFiles(isFolderOrImageType);
    return _.reduce(result, function (ret, target) {
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
  switch (File.fs) {
  case 'Macintosh':
    return isFolderOrImageType;
  case 'Windows':
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