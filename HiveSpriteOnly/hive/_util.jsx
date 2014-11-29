var _ = require('../lib/underscore');

module.exports = {
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

  isFile: isFile,
  isFolder: isFolder,
  isImageType: isImageType,
  isFolderOrImageType: isFolderOrImageType,
  dialogFilter: dialogFilter,

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

  newLayersFromFiles: function newLayersFromFiles(specList) {
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

