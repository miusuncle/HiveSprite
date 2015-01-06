var _            = require('../lib/underscore');
var util         = require('../lib/util');
var JSON         = require('../lib/json2');
var choices      = require('./choices');
var settings     = require('./settings');

var BrowseUsing  = choices.BrowseUsing;
var BuildMethods = choices.BuildMethods;
var ArrangeBy    = choices.ArrangeBy;
var CSSFormats   = choices.CSSFormats;

var defaults = {
  'dataList'              : [],

  'browseUsing'           : BrowseUsing.FILES,
  'includeSubfolders'     : false,
  'previewImages'         : false,

  'outputFolder'          : util.desktopFolder,
  'exportSpriteImage'     : true,
  'exportCSSFile'         : true,
  'closeGeneratedDocument': true,
  'openOutputFolder'      : true,

  'buildMethod'           : BuildMethods.VERTICAL,
  'arrangeBy'             : ArrangeBy.ROWS,
  'offsetSpacing'         : '5',
  'horizontalSpacing'     : '5',
  'verticalSpacing'       : '5',
  'rowNums'               : '1',

  'cssFormat'             : CSSFormats.COMPACT,
  'includeWidthHeight'    : true,
  'includeBGI'            : true,
  'selectorPrefix'        : '',
  'classPrefix'           : 'sp-',
  'selectorSuffix'        : ''
};

var exports = _.extend({}, defaults);

if (settings.applyLastSettings) {
  var filepath = settings.lastSettingsFilePath;
  _.extend(exports, util.readJSON(filepath));
}

module.exports = exports;
