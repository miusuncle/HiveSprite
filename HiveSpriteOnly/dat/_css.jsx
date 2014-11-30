var take = require('../lib/take');
var _    = require('../lib/underscore');

var CSS = take({
  init: function ($) {
    this.bindCtrls($);
    this.initView();
    return this;
  },

  getData: function () {
    return {
      selectorPrefix    : this.txtSelectorPrefix.text,
      classPrefix       : this.txtClassPrefix.text,
      selectorSuffix    : this.txtSelectorSuffix.text,
      includeWidthHeight: this.chkIncludeWidthHeight.value
    };
  },

  initView: function () {
    this.txtSelectorPrefix.text = '';
    this.txtClassPrefix.text = 'sp-';
    this.txtSelectorSuffix.text = '';
    this.chkIncludeWidthHeight.value = true;
  },

  bindCtrls: function ($) {
    _.each([
      'txtSelectorPrefix',
      'txtClassPrefix',
      'txtSelectorSuffix',
      'chkIncludeWidthHeight'
    ], function (name) {
      this[name] = $(name);
    }, this);
  }
});

module.exports = function ($) {
  return (new CSS).init($);
};
