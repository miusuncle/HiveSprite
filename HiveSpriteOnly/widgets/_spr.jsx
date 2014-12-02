var constants    = require('../config/constants');
var take         = require('../lib/take');
var on           = require('../lib/on');
var _            = require('../lib/underscore');
var util         = require('../lib/util');

var BuildMethods = constants.BuildMethods;

var SPRITE = take({
  init: function ($) {
    this.bindCtrls($);
    this.initView();
    return this;
  },

  getData: function () {
    return {
      buildMethod: this.ddlBuildMethod.selection.text.toUpperCase(),
      offsetDistance: +this.txtOffsetSpacing.text
    };
  },

  initView: function () {
    // initialize dropdownlist `Build Method`
    _.each(BuildMethods, function (index, text) {
      this.ddlBuildMethod.add('item', util.titleCase(text));
    }, this);

    // `Build Method` default to `Vertical`
    this.ddlBuildMethod.selection = 1;
    this.txtOffsetSpacing.text = '0';
  },

  bindCtrls: function ($) {
    _.each([
      'ddlBuildMethod',
      'txtOffsetSpacing'
    ], function (name) {
      this[name] = $(name);
    }, this);
  }
});

module.exports = function ($) {
  return (new SPRITE).init($);
};
