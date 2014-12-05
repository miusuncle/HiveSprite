var constants = require('../config/constants');
var MSG       = require('../config/i18n').MSG;
var util      = require('../lib/util');
var _         = require('../lib/underscore');

var ArrangeBy = constants.ArrangeBy;

var rules = module.exports = {
  'hivesprite': {
    'lstSourceImages': {
      required: [util.localize(MSG.SOURCE_IMAGES_REQUIRED)]
    },

    'txtOutputFolder': {
      required: [util.localize(MSG.OUTPUT_FOLDER_REQUIRED)],
      folderpath: [util.localize(MSG.OUTPUT_FOLDER_INVALID)]
    },

    'txtRowNums': {
      required: [rowNumsFormatter(util.localize(MSG.ROW_NUMS_REQUIRED))],
      positivewholenumber: [rowNumsFormatter(util.localize(MSG.ROW_NUMS_POS_NUM))],
      range: [rowNumsFormatter(util.localize(MSG.ROW_NUMS_RANGE)), [1, 50]]
    },

    'txtHorizontalSpacing': {
      required: [util.localize(MSG.HORIZ_SPACING_REQUIRED)],
      positivewholenumber: [util.localize(MSG.HORIZ_SPACING_POS_NUM)],
      range: [util.localize(MSG.HORIZ_SPACING_RANGE), [0, 200]]
    },

    'txtVerticalSpacing': {
      required: [util.localize(MSG.VERTICAL_SPACING_REQUIRED)],
      positivewholenumber: [util.localize(MSG.VERTICAL_SPACING_POS_NUM)],
      range: [util.localize(MSG.VERTICAL_SPACING_RANGE), [0, 200]]
    },

    'txtOffsetSpacing': {
      required: [util.localize(MSG.OFFSET_SPACING_REQUIRED)],
      positivewholenumber: [util.localize(MSG.OFFSET_SPACING_POS_NUM)],
      range: [util.localize(MSG.OFFSET_SPACING_RANGE), [0, 200]]
    },

    'txtSelectorPrefix': {
      maxlength: [util.localize(MSG.SELECTOR_PREFIX_MAX_LENGTH), 20]
    },

    'txtClassPrefix': {
      startwithletter: [util.localize(MSG.CLASS_PREFIX_LETTER_FIRST)],
      maxlength: [util.localize(MSG.CLASS_PREFIX_MAX_LENGTH), 20]
    },

    'txtSelectorSuffix': {
      maxlength: [util.localize(MSG.SELECTOR_SUFFIX_MAX_LENGTH), 20]
    }
  }
};

_.each(rules.hivesprite, function (checkers, key, obj, exempts) {
  exempts = ['txtRowNums', 'txtHorizontalSpacing', 'txtVerticalSpacing', 'txtOffsetSpacing'];
  if (_.contains(exempts, key)) {
    _.each(checkers, _.partial(util.inject, _, 'exempt', _.negate(_.property('visible'))));
  }

  exempts = ['txtSelectorPrefix', 'txtClassPrefix', 'txtSelectorSuffix'];
  if (_.contains(exempts, key)) {
    _.each(checkers, _.partial(util.inject, _, 'exempt', _.negate(_.property('enabled'))));
  }
});

function rowNumsFormatter(message) {
  return function (ctrl, $) {
    var ddlArrangeBy = $('ddlArrangeBy');
    var label = '';

    switch (+ddlArrangeBy.selection) {
    case ArrangeBy.ROWS:
      label = util.localize(MSG.COLUMNS_PER_ROW);
      break;
    case ArrangeBy.COLUMNS:
      label = util.localize(MSG.ROWS_PER_COLUMN);
      break;
    }

    return util.vsub(message, { 'target': label });
  };
}
