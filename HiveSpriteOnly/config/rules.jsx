var util      = require('../lib/util');
var _         = require('../lib/underscore');
var constants = require('../config/constants');

var ArrangeBy = constants.ArrangeBy;

var rules = module.exports = {
  'hivesprite': {
    'lstSourceImages': {
      required: ['Source images can not be empty.']
    },

    'txtOutputFolder': {
      required: ['Output folder can not be empty.'],
      folderpath: ['Please specify a valid output folder.']
    },

    'txtRowNums': {
      required: [rowNumsFormatter('${target} can not be empty.')],
      positivewholenumber: [rowNumsFormatter('${target} should accept a positive whole number value.')],
      range: [rowNumsFormatter('${target} need a number value between ${0} and ${1}.'), [1, 30]]
    },

    'txtHorizontalSpacing': {
      required: ['Horizontal Spacing can not be empty.'],
      positivewholenumber: ['Horizontal Spacing should accept a positive whole number value.'],
      range: ['Horizontal Spacing need a number value between ${0} and ${1}.', [0, 50]]
    },

    'txtVerticalSpacing': {
      required: ['Vertical Spacing can not be empty.'],
      positivewholenumber: ['Vertical Spacing should accept a positive whole number value.'],
      range: ['Vertical Spacing need a number value between ${0} and ${1}.', [0, 50]]
    },

    'txtOffsetSpacing': {
      required: ['Offset Spacing can not be empty.'],
      positivewholenumber: ['Offset Spacing should accept a positive whole number value.'],
      range: ['Offset Spacing need a number value between ${0} and ${1}.', [0, 50]]
    },

    'txtSelectorPrefix': {
      maxlength: ['Selector prefix input SHALL not more than ${0} charaters.', 20]
    },

    'txtClassPrefix': {
      startwithletter: ['Class prefix SHALL start with a letter.'],
      maxlength: ['Class prefix input SHALL not more than ${0} charaters.', 20]
    },

    'txtSelectorSuffix': {
      maxlength: ['Selector suffix input SHALL not more than ${0} charaters.', 20]
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
      label = 'Columns per Row';
      break;
    case ArrangeBy.COLUMNS:
      label = 'Rows per Column';
      break;
    }

    return util.vsub(message, { 'target': label });
  };
}
