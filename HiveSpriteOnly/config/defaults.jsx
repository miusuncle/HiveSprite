var constants    = require('./constants');

var BrowseUsing  = constants.BrowseUsing;
var BuildMethods = constants.BuildMethods;
var ArrangeBy    = constants.ArrangeBy;
var CSSFormats   = constants.CSSFormats;

module.exports = {
  'browseUsing'           : BrowseUsing.FILES,
  'includeSubfolders'     : false,
  'previewImages'         : false,

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
