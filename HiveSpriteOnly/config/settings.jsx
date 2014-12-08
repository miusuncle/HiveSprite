var util = require('../lib/util');
var _    = require('../lib/underscore');

var settings = {
  'confirmRemoveAll'    : true,
  'confirmRemove'       : false,

  'abortOnUnknownImages': true,

  'saveLastSettings'    : true,
  'applyLastSettings'   : true,
  'lastSettingsFilePath': '~/.hivespriterc'
};

_.extend(settings, {
  save: function (jsonVal) {
    // util.inspect(jsonVal);
    util.writeJSON(this.lastSettingsFilePath, jsonVal);
  }
});

module.exports = settings;
