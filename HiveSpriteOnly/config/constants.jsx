var _    = require('../lib/underscore');
var util = require('../lib/util');

var CONSTANTS = {
  BrowseUsing : ['FILES', 'FOLDER'],
  BuildMethods: ['HORIZONTAL', 'VERTICAL', 'TILED'],
  ArrangeBy   : ['ROWS', 'COLUMNS'],
  CSSFormats  : ['COMPACT', 'EXPANDED']
};

module.exports = _.reduce(CONSTANTS, function (ret, values, key) {
  return util.inject(ret, key, _.reduce(values, function (vo, val, idx) {
    return util.inject(vo, val, idx);
  }, {}));
}, {});

// util.inspect(module.exports);
