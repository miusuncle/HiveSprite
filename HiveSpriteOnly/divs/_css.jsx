var nls        = require('../config/i18n');
var choices    = require('../config/choices');
var defaults   = require('../config/defaults');
var take       = require('../lib/take');
var on         = require('../lib/on');
var _          = require('../lib/underscore');
var util       = require('../lib/util');

var CHC        = nls.CHC;
var ERR        = nls.ERR;
var UI         = nls.UI;
var CSSFormats = choices.CSSFormats;

var CSS = take({
  init: function ($) {
    this.bindCtrls($);
    this.localizeUI();
    this.initView();
    this.bindEvents();
    return this;
  },

  getData: function () {
    return {
      cssFormat         : +this.ddlCSSFormat.selection,
      includeWidthHeight: this.chkIncludeWidthHeight.value,
      includeBGI        : this.chkIncludeBGI.value,
      selectorPrefix    : this.txtSelectorPrefix.text,
      classPrefix       : this.txtClassPrefix.text,
      selectorSuffix    : this.txtSelectorSuffix.text
    };
  },

  bindCtrls: function ($) {
    _.each([
      'pnlCSSExportOptions',
      'lblCSSFormat',
      'ddlCSSFormat',
      'chkIncludeWidthHeight',
      'chkIncludeBGI',

      'lblSelectorPrefix',
      'txtSelectorPrefix',
      'lblSelectorPrefixHint',

      'lblClassPrefix',
      'txtClassPrefix',
      'lblClassPrefixHint',

      'lblSelectorSuffix',
      'txtSelectorSuffix',
      'lblSelectorSuffixHint',

      'chkExportSpriteImage'
    ], function (name) {
      this[name] = $(name);
    }, this);
  },

  localizeUI: function () {
    this.pnlCSSExportOptions.text      = util.localize(UI.CSS_EXPORT_OPTIONS);
    this.lblCSSFormat.text             = util.localize(UI.CSS_FORMAT);

    this.chkIncludeWidthHeight.text    = util.localize(UI.INC_WIDTH_HEIGHT);
    this.chkIncludeWidthHeight.helpTip = util.localize(UI.INC_WIDTH_HEIGHT_TIP);

    this.chkIncludeBGI.text            = util.localize(UI.INC_BGI);
    this.chkIncludeBGI.helpTip         = util.localize(UI.INC_BGI_TIP);

    this.lblSelectorPrefix.text        = util.localize(UI.SELECTOR_PREFIX);
    this.lblClassPrefix.text           = util.localize(UI.CLASS_PREFIX);
    this.lblSelectorSuffix.text        = util.localize(UI.SELECTOR_SUFFIX);


    if (util.zhify()) {
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

    this.ddlCSSFormat.selection      = defaults.cssFormat;
    this.chkIncludeWidthHeight.value = defaults.includeWidthHeight;
    this.chkIncludeBGI.value         = defaults.includeBGI;
    this.txtSelectorPrefix.text      = defaults.selectorPrefix;
    this.txtClassPrefix.text         = defaults.classPrefix;
    this.txtSelectorSuffix.text      = defaults.selectorSuffix;
  },

  bindEvents: function () {
    var chkIncludeBGI        = this.chkIncludeBGI;
    var chkExportSpriteImage = this.chkExportSpriteImage;

    on(chkIncludeBGI, 'click', includeBGIClicked);
    chkIncludeBGI.value && _.times(2, includeBGIClicked);

    function includeBGIClicked() {
      var exportImage = chkExportSpriteImage.value;
      var includeBGI  = chkIncludeBGI.value;

      if (!exportImage && includeBGI) {
        chkIncludeBGI.value = !includeBGI;
        util.alert(util.localize(ERR.CHK_INCLUDE_BGI));
      }
    }
  }
});

module.exports = function ($) {
  return (new CSS).init($);
};
