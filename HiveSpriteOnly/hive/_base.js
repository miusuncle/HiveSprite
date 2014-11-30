var take      = require('../lib/take');
var Validator = require('./_validator');

module.exports = take({
  isValid: function () {
    return this.validator().validate();
  },

  validator: function () {
    var _validator = this._validator;

    if (!_validator) {
      _validator = new Validator(this);
      this._validator = _validator;
    }

    return _validator;
  }
});
