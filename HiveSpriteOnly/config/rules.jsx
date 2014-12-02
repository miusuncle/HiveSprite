module.exports = {
  'hivesprite': {
    'lstSourceImages': {
      required: [true, 'Source images can not be empty.']
    },

    'txtOutputFolder': {
      required: [true, 'Output folder can not be empty.'],
      folderpath: [true, 'Please specify a valid output folder.']
    },

    'txtOffsetSpacing': {
      required: [true, 'Offset distance can not be empty.'],
      positivenumber: [true, 'Offset distance should accept a positive number value.'],
      range: [[0, 50], 'Offset distance need a number value between ${0} and ${1}.']
    },

    'txtSelectorPrefix': {
      maxlength: [20, 'Selector prefix input SHALL not more than ${0} charaters.']
    },

    'txtClassPrefix': {
      startwithletter: ['', 'Class prefix SHALL start with a letter.'],
      maxlength: [20, 'Class prefix input SHALL not more than ${0} charaters.']
    },

    'txtSelectorSuffix': {
      maxlength: [20, 'Selector suffix input SHALL not more than ${0} charaters.']
    }
  }
};
