var take = require('../lib/take');
var _    = require('../lib/underscore');

var SPRITE = take({
  init: function ($) {
    this.bindCtrls($);
    this.initView();
    return this;
  },

  getData: function () {
    return {
      buildDirection: this.ddlBuildDirection.selection.text,
      offsetDistance: this.txtOffsetDistance.text
    };
  },

  initView: function () {
    var Directions = this.Directions = { Horizontal: 0, Vertical: 1 };

    // initialize dropdownlist `build direction`
    _.each(Directions, function (index, text) {
      this.ddlBuildDirection.add('item', text);
    }, this);

    // `build direction` default to `Vertical`
    this.ddlBuildDirection.selection = 1;
    this.txtOffsetDistance.text = '0';
  },

  bindCtrls: function ($) {
    _.each([
      'ddlBuildDirection',
      'txtOffsetDistance'
    ], function (name) {
      this[name] = $(name);
    }, this);
  }
});

module.exports = function ($) {
  return (new SPRITE).init($);
};
