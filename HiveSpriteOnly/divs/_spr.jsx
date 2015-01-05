var nls          = require('../config/i18n');
var choices      = require('../config/choices');
var defaults     = require('../config/defaults');
var take         = require('../lib/take');
var on           = require('../lib/on');
var _            = require('../lib/underscore');
var util         = require('../lib/util');

var CHC          = nls.CHC;
var UI           = nls.UI;
var BuildMethods = choices.BuildMethods;
var ArrangeBy    = choices.ArrangeBy;

var SPRITE = take({
  init: function ($) {
    this.bindCtrls($);
    this.localizeUI();
    this.initView();
    this.bindEvents();
    this.reviveView();
    return this;
  },

  getData: function () {
    return {
      buildMethod      : +this.ddlBuildMethod.selection,
      offsetSpacing    : +this.txtOffsetSpacing.text,

      arrangeBy        : +this.ddlArrangeBy.selection,
      horizontalSpacing: +this.txtHorizontalSpacing.text,
      verticalSpacing  : +this.txtVerticalSpacing.text,
      rowNums          : +this.txtRowNums.text
    };
  },

  bindCtrls: function ($) {
    _.each([
      'pnlSpriteBuildingOptions',
      'lblBuildMethod',
      'ddlBuildMethod',

      'grpArrangement',
      'lblArrangeBy',
      'ddlArrangeBy',
      'lblColsPerRow',
      'lblRowsPerCol',
      'txtRowNums',

      'grpSoloSpacing',
      'lblOffsetSpacing',
      'txtOffsetSpacing',
      'lblOffsetSpacingUnit',

      'grpDualSpacing',
      'lblHorizontalSpacing',
      'txtHorizontalSpacing',
      'lblHorizontalSpacingUnit',

      'lblVerticalSpacing',
      'txtVerticalSpacing',
      'lblVerticalSpacingUnit'
    ], function (name) {
      this[name] = $(name);
    }, this);
  },

  localizeUI: function () {
    this.pnlSpriteBuildingOptions.text = util.localize(UI.SPRITE_BUILD_OPTIONS);
    this.lblBuildMethod.text           = util.localize(UI.BUILD_METHOD);
    this.lblArrangeBy.text             = util.localize(UI.ARRANGE_BY);
    this.lblColsPerRow.text            = util.localize(UI.COLUMNS_PER_ROW);
    this.lblRowsPerCol.text            = util.localize(UI.ROWS_PER_COLUMN);
    this.txtRowNums.helpTip            = util.localize(UI.INPUT_RANGE_1_50);

    this.lblOffsetSpacing.text         = util.localize(UI.OFFSET_SPACING);
    this.txtOffsetSpacing.helpTip      = util.localize(UI.INPUT_RANGE_0_200);
    this.lblOffsetSpacingUnit.text     = util.localize(UI.PIXELS);

    this.lblHorizontalSpacing.text     = util.localize(UI.HORIZ_SPACING);
    this.txtHorizontalSpacing.helpTip  = util.localize(UI.INPUT_RANGE_0_200);
    this.lblHorizontalSpacingUnit.text = util.localize(UI.PIXELS);

    this.lblVerticalSpacing.text       = util.localize(UI.VERTICAL_SPACING);
    this.txtVerticalSpacing.helpTip    = util.localize(UI.INPUT_RANGE_0_200);
    this.lblVerticalSpacingUnit.text   = util.localize(UI.PIXELS);

    if (util.zhify()) {
      this.ddlArrangeBy.preferredSize = [120, -1];
      this.lblArrangeBy.preferredSize = [120, -1];

      this.lblColsPerRow.preferredSize = [120, -1];
      this.lblRowsPerCol.preferredSize = [120, -1];

      this.lblVerticalSpacing.preferredSize = [84, -1];
    }
  },

  initView: function () {
    // initialize dropdownlist `Build Method`
    _.each(BuildMethods, function (index, text) {
      this.ddlBuildMethod.add('item', util.localize(CHC[text]));
    }, this);

    _.each(ArrangeBy, function (index, text) {
      this.ddlArrangeBy.add('item', util.localize(CHC[text]));
    }, this);

    this.setView(defaults);
  },

  setView: function (settings) {
    settings = _.defaults({}, settings, defaults);

    this.ddlBuildMethod.selection  = settings.buildMethod;
    this.ddlArrangeBy.selection    = settings.arrangeBy;

    this.txtOffsetSpacing.text     = settings.offsetSpacing;
    this.txtHorizontalSpacing.text = settings.horizontalSpacing;
    this.txtVerticalSpacing.text   = settings.verticalSpacing;

    this.txtRowNums.text           = settings.rowNums;
  },

  bindEvents: function () {
    var self           = this;
    var ddlBuildMethod = self.ddlBuildMethod;
    var grpArrangement = self.grpArrangement;
    var ddlArrangeBy   = self.ddlArrangeBy;
    var lblColsPerRow  = self.lblColsPerRow;
    var lblRowsPerCol  = self.lblRowsPerCol;
    var txtRowNums     = self.txtRowNums;
    var grpSoloSpacing = self.grpSoloSpacing;
    var grpDualSpacing = self.grpDualSpacing;

    on(ddlBuildMethod, 'change', _.bind(self.trigger, self, 'buildmethod:change'));
    on(ddlArrangeBy, 'change', _.bind(self.trigger, self, 'arrangement:change'));

    on(self, {
      'buildmethod:change': function () {
        var selection = +ddlBuildMethod.selection;

        switch (selection) {
        case BuildMethods.HORIZONTAL:
        case BuildMethods.VERTICAL:
          grpArrangement.visible = false;
          grpDualSpacing.visible = false;
          grpSoloSpacing.visible = true;
          break;
        case BuildMethods.TILED:
        case BuildMethods.GROUPED:
          grpSoloSpacing.visible = false;
          grpArrangement.visible = true;
          grpDualSpacing.visible = true;

          _.each(
            [lblRowsPerCol, lblColsPerRow, txtRowNums],
            _.partial(util.inject, _, 'visible', selection === BuildMethods.TILED)
          );

          self.trigger('arrangement:change');
          break;
        }
      },

      'arrangement:change': function () {
        if (+ddlBuildMethod.selection !== BuildMethods.TILED) {
          return;
        }

        switch (+ddlArrangeBy.selection) {
        case ArrangeBy.ROWS:
          lblRowsPerCol.visible = false;
          lblColsPerRow.visible = true;
          break;
        case ArrangeBy.COLUMNS:
          lblColsPerRow.visible = false;
          lblRowsPerCol.visible = true;
          break;
        }
      }
    });
  },

  reviveView: function () {
    this.trigger('buildmethod:change');
    this.trigger('arrangement:change');
  }
});

module.exports = function ($) {
  return (new SPRITE).init($);
};
