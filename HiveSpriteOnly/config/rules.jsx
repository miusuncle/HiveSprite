module.exports = {
  'hivesprite': {
    rules: {
      'lstSourceImages': {
        required: true
      },

      'txtOffsetDistance': {
        required: true,
        range: [0, 50]
      },

      'txtSelectorPrefix': {
        maxlength: 20
      },

      'txtClassPrefix': {
        maxlength: 20
      },

      'txtSelectorSuffix': {
        maxlength: 20
      },

      'txtOutputFolder': {
        required: true,
        folder: true
      }
    },

    messages: {}
  }
};
