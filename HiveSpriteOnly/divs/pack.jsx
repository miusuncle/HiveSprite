var nls      = require('../config/i18n');
var defaults = require('../config/defaults');
var settings = require('../config/settings');
var _        = require('../lib/underscore');
var util     = require('../lib/util');
var on       = require('../lib/on');

var divSrc   = require('./_src');
var divOut   = require('./_out');
var divCss   = require('./_css');
var divSpr   = require('./_spr');

module.exports = function ($) {
  var UI  = nls.UI;
  var DLG = nls.DLG;
  var ERR = nls.ERR;

  // util.inspect(targetImages);
  var SEPARATOR = settings.placeholderSymbol;
  var IMG_NAME_SEP = settings.imageNameSeparator;

  var divs = [divSrc($), divOut($), divSpr($), divCss($)];

  var cmdImport = $('cmdImport');
  var cmdExport = $('cmdExport');

  cmdImport.text = util.localize(UI.IMPORT);
  cmdExport.text = util.localize(UI.EXPORT);

  if (settings.hideImportExport) {
    $('pnlImpExpSep').visible = false;

    cmdImport.visible = false;
    cmdExport.visible = false;
  }

  on(cmdImport, 'click', function () {
    var promptText = util.localize(DLG.IMPORT_SETTINGS_FORM_FILE);
    var unknownErr = util.localize(ERR.UNKNOWN_ERROR);

    var fileHandle = File.openDialog(promptText, undefined, false);
    if (!fileHandle) { return; }

    try {
      var input = util.readJSON(fileHandle.fsName);
      // util.inspect(input);

      if (!_.isObject(input)) {
        throw new TypeError(unknownErr);
      }

      var intersect = _.intersection(_.keys(defaults), _.keys(input));
      // util.inspect(intersect);

      if (!_.size(intersect)) {
        throw new TypeError(unknownErr);
      }

      if (input.isImagePathRelatived) {
        var baseDir = fileHandle.parent.fullName;

        var dataList = _.reduce(input.dataList, function (ret, item, index) {
          if (item.name !== SEPARATOR) {
            item.path = [baseDir, item.path].join('/');
          }

          return util.inject(ret, index, item);
        }, []);

        // util.inspect(dataList);
        input.dataList = dataList;
      }

      _.each(divs, function (div) {
        div.setView(input);
      });
    } catch (e) {
      util.alert(unknownErr);
    }
  });

  on(cmdExport, 'click', function () {
    var output = getData(true);
    var sourceImages = util.deepClone(output.sourceImages);

    output = _.pick(getData(true), _.keys(defaults));
    // util.inspect(output);

    // remove duplicates
    sourceImages = _.uniq(sourceImages, _.property('path'));

    var confirmation = !!_.size(sourceImages);
    var exportImageTips = util.localize(DLG.EXPORT_IMAGES_TIPS);
    var exportImage = confirmation ? util.confirm(exportImageTips) : false;

    if (!exportImage) {
      var promptFile = util.localize(DLG.EXPORT_SETTINGS_TO_FILE);
      var exportFile = File.saveDialog(promptFile);

      exportFile && util.writeJSON(exportFile.fsName, output);
    } else {
      var promptFolder = util.localize(DLG.EXPORT_SETTINGS_TO_FOLDER);
      var exportFolder = Folder.selectDialog(promptFolder);
      if (!exportFolder) { return; }

      var folderName = 'HiveSpriteConfig-' + Date.now();
      exportFolder.changePath(folderName);

      if (!exportFolder.create()) {
        util.alert(util.localize(ERR.DEST_ACCESS_DENIED));
        return;
      }

      var fname = [exportFolder.fullName, 'settings.hivesprite'].join('/');
      var fileHandle = new File(fname);
      var imgFolderName = 'images';

      var imageSubDir = [exportFolder.fullName, imgFolderName].join('/');
      var imageFolder = new Folder(imageSubDir);
      imageFolder.create();

      var targetImages = _.map(sourceImages, function (image) {
        var sep = IMG_NAME_SEP + (+String(Math.random()).slice(2)).toString(36);
        sep = sep.toUpperCase();

        var parts = image.name.split('.');
        var ext = parts.pop();

        parts = [parts.join('.'), ext];
        parts = [parts[0].split(IMG_NAME_SEP)[0], parts[1]];

        var sepname = parts.join(sep + '.');

        image.name = parts.join('.');
        image.relpath = [imgFolderName, sepname].join('/');
        image.newpath = [imageSubDir, sepname].join('/');

        var imageHandle = new File(image.path);
        if (imageHandle.exists) {
          imageHandle.copy(image.newpath);
        }

        return image;
      });

      var dataList = _.reduce(output.dataList, function (ret, item, index) {
        if (item.name !== SEPARATOR) {
          var target = _.find(targetImages, function (image) {
            return image.path === item.path;
          });

          item.name = target.name;
          item.path = target.relpath;
        }

        return util.inject(ret, index, item);
      }, []);

      // util.inspect(dataList);

      output.isImagePathRelatived = true;
      output.dataList = dataList;
      util.writeJSON(fileHandle.fsName, output);

      var toOpen = util.confirm(util.localize(DLG.EXPORT_SUCCEED));
      toOpen && exportFolder.execute();
    }
  });

  function getData(includeMore) {
    return _.reduce(divs, function (ret, div) {
      return _.extend(ret, div.getData(includeMore));
    }, {});
  }

  return {
    'getData': getData
  };
};
