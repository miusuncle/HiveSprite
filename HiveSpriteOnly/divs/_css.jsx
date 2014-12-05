var nls        = require('../config/i18n');
var constants  = require('../config/constants');
var take       = require('../lib/take');
var _          = require('../lib/underscore');
var util       = require('../lib/util');

var CHC        = nls.CHC;
var UI         = nls.UI;
var CSSFormats = constants.CSSFormats;

var CSS = take({
  init: function ($) {
    this.bindCtrls($);
    this.localizeUI();
    this.initView();
    return this;
  },

  getData: function () {
    return {
      cssFormat         : +this.ddlCSSFormat.selection,
      selectorPrefix    : this.txtSelectorPrefix.text,
      classPrefix       : this.txtClassPrefix.text,
      selectorSuffix    : this.txtSelectorSuffix.text,
      includeWidthHeight: this.chkIncludeWidthHeight.value
    };
  },

  bindCtrls: function ($) {
    _.each([
      'pnlCSSExportOptions',
      'lblCSSFormat',
      'ddlCSSFormat',
      'chkIncludeWidthHeight',

      'lblSelectorPrefix',
      'txtSelectorPrefix',
      'lblSelectorPrefixHint',

      'lblClassPrefix',
      'txtClassPrefix',
      'lblClassPrefixHint',

      'lblSelectorSuffix',
      'txtSelectorSuffix',
      'lblSelectorSuffixHint'
    ], function (name) {
      this[name] = $(name);
    }, this);
  },

  localizeUI: function () {
    this.pnlCSSExportOptions.text      = util.localize(UI.CSS_EXPORT_OPTIONS);
    this.lblCSSFormat.text             = util.localize(UI.CSS_FORMAT);
    this.chkIncludeWidthHeight.text    = util.localize(UI.INC_WIDTH_HEIGHT);
    this.chkIncludeWidthHeight.helpTip = util.localize(UI.INC_WIDTH_HEIGHT_TIP);

    this.lblSelectorPrefix.text        = util.localize(UI.SELECTOR_PREFIX);
    this.lblClassPrefix.text           = util.localize(UI.CLASS_PREFIX);
    this.lblSelectorSuffix.text        = util.localize(UI.SELECTOR_SUFFIX);


    if (util.locale === 'zh') {
      this.txtSelectorPrefix.helpTip  = util.localize(UI.CHAR_RANGE_0_20);
      this.lblSelectorPrefixHint.text = util.localize(UI.EMPTY);

      this.txtClassPrefix.helpTip     = util.localize(UI.CHAR_RANGE_0_20);
      this.lblClassPrefixHint.text    = util.localize(UI.EMPTY);

      this.txtSelectorSuffix.helpTip  = util.localize(UI.CHAR_RANGE_0_20);
      this.lblSelectorSuffixHint.text = util.localize(UI.EMPTY);
    } else {
      this.txtSelectorPrefix.helpTip  = util.localize(UI.SELECTOR_PREFIX_TIP);
      this.lblSelectorPrefixHint.text = util.localize(UI.CHAR_RANGE_0_20);

      this.txtClassPrefix.helpTip     = util.localize(UI.CLASS_PREFIX_TIP);
      this.lblClassPrefixHint.text    = util.localize(UI.CHAR_RANGE_0_20);

      this.txtSelectorSuffix.helpTip  = util.localize(UI.SELECTOR_SUFFIX_TIP);
      this.lblSelectorSuffixHint.text = util.localize(UI.CHAR_RANGE_0_20);
    }
  },

  initView: function () {
    // initialize dropdownlist `CSS Format`
    _.each(CSSFormats, function (index, text) {
      this.ddlCSSFormat.add('item', util.localize(CHC[text]));
    }, this);

    // `CSS Format` default to `Expanded`
    this.ddlCSSFormat.selection = 0;

    this.txtSelectorPrefix.text      = '';
    this.txtClassPrefix.text         = 'sp-';
    this.txtSelectorSuffix.text      = '';
    this.chkIncludeWidthHeight.value = true;
  }
});

module.exports = function ($) {
  return (new CSS).init($);
};
