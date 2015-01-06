var nls      = require('../config/i18n');
var defaults = require('../config/defaults');
var _        = require('../lib/underscore');
var util     = require('../lib/util');
var on       = require('../lib/on');

var divSrc   = require('./_src');
var divOut   = require('./_out');
var divCss   = require('./_css');
var divSpr   = require('./_spr');

module.exports = function ($) {
  var UI = nls.UI;
  var DLG = nls.DLG;
  var ERR = nls.ERR;

  var divs = [divSrc($), divOut($), divSpr($), divCss($)];

  var cmdImport = $('cmdImport');
  var cmdExport = $('cmdExport');

  cmdImport.text = util.localize(UI.IMPORT);
  cmdExport.text = util.localize(UI.EXPORT);

  on(cmdImport, 'click', function () {
    var promptText = util.localize(DLG.IMPORT_SETTINGS);
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

      _.each(divs, function (div) {
        div.setView(input);
      });
    } catch (e) {
      util.alert(unknownErr);
    }
  });

  on(cmdExport, 'click', function () {
    var output = _.pick(getData(true), _.keys(defaults));
    // util.inspect(output);

    var promptText = util.localize(DLG.EXPORT_SETTINGS);
    var fileHandle = File.saveDialog(promptText);
    fileHandle && util.writeJSON(fileHandle.fsName, output);
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
