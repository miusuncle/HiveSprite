var take  = require('../lib/take');
var _     = require('../lib/underscore');
var util  = require('../lib/util');

var Validator = take({
  constructor: function (target) {
    this.$ = target.$;
    this.validateRules = target.validateRules;
  },

  validate: function () {
    var validateRules = this.validateRules;
    // util.inspect(validateRules);

    if (_.isEmpty(validateRules)) {
      return true;
    }

    return true;
  }
});

module.exports = Validator;
