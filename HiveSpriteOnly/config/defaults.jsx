var _            = require('../lib/underscore');
var util         = require('../lib/util');
var choices      = require('./choices');

var BrowseUsing  = choices.BrowseUsing;
var BuildMethods = choices.BuildMethods;
var ArrangeBy    = choices.ArrangeBy;
var CSSFormats   = choices.CSSFormats;

var defaults = {
  'confirmRemoveAll'      : true,
  'confirmRemove'         : false,

  'abortOnUnknownImages'  : true,

  'browseUsing'           : BrowseUsing.FILES,
  'includeSubfolders'     : false,
  'previewImages'         : false,

  'desktopFolder'         : util.desktopFolder,
  'exportSpriteImage'     : true,
  'exportCSSFile'         : true,
  'closeGeneratedDocument': true,
  'openOutputFolder'      : true,

  'buildMethod'           : BuildMethods.VERTICAL,
  'arrangeBy'             : ArrangeBy.ROWS,
  'offsetSpacing'         : '5',
  'horizontalSpacing'     : '5',
  'verticalSpacing'       : '5',
  'rowNumbers'            : '1',

  'cssFormat'             : CSSFormats.COMPACT,
  'selectorPrefix'        : '',
  'classPrefix'           : 'sp-',
  'selectorSuffix'        : '',
  'includeWidthHeight'    : true
};

module.exports = _.extend(defaults, {
  'separator': '-',
  'dataList': []
});
