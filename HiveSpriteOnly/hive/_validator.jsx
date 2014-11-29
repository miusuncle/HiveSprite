var take = require('../lib/take');
var _    = require('../lib/underscore');

var Validator = take({
  constructor: function ($) {

  },

  isValid: function () {
    return true;
  }
});

module.exports = Validator;
