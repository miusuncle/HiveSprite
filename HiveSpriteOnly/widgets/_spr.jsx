var constants    = require('../config/constants');
var take         = require('../lib/take');
var on           = require('../lib/on');
var _            = require('../lib/underscore');
var util         = require('../lib/util');

var BuildMethods = constants.BuildMethods;
var ArrangeBy    = constants.ArrangeBy;

var SPRITE = take({
  init: function ($) {
    this.bindCtrls($);
    this.initView();
    this.bindEvents();
    return this;
  },

  getData: function () {
    return {
      buildMethod      : this.ddlBuildMethod.selection.text.toUpperCase(),
      offsetSpacing    : +this.txtOffsetSpacing.text,

      arrangeBy        : this.ddlArrangeBy.selection.text.toUpperCase(),
      horizontalSpacing: +this.txtHorizontalSpacing.text,
      verticalSpacing  : +this.txtVerticalSpacing.text,
      rowNums          : +this.txtRowNums.text
    };
  },

  initView: function () {
    // initialize dropdownlist `Build Method`
    _.each(BuildMethods, function (index, text) {
      this.ddlBuildMethod.add('item', util.titleCase(text));
    }, this);

    _.each(ArrangeBy, function (index, text) {
      this.ddlArrangeBy.add('item', util.titleCase(text));
    }, this);

    // `Build Method` default to `Vertical`
    this.ddlBuildMethod.selection = 1;

    // `Arrangement` default to `Rows`
    this.ddlArrangeBy.selection = 0;

    this.txtOffsetSpacing.text   = '1';
    this.txtHorizontalSpacing.text    = '1';
    this.txtVerticalSpacing.text = '1';
    this.txtRowNums.text         = '1';
  },

  bindCtrls: function ($) {
    _.each([
      'ddlBuildMethod',

      'grpArrangement',
      'ddlArrangeBy',
      'lblColsPerRow',
      'lblRowsPerCol',
      'txtRowNums',

      'grpSoloSpacing',
      'txtOffsetSpacing',

      'grpDualSpacing',
      'txtHorizontalSpacing',
      'txtVerticalSpacing'
    ], function (name) {
      this[name] = $(name);
    }, this);
  },

  bindEvents: function () {
    var self           = this;
    var ddlBuildMethod = self.ddlBuildMethod;
    var grpArrangement   = self.grpArrangement;
    var ddlArrangeBy   = self.ddlArrangeBy;
    var lblColsPerRow  = self.lblColsPerRow;
    var lblRowsPerCol  = self.lblRowsPerCol;
    var grpSoloSpacing = self.grpSoloSpacing;
    var grpDualSpacing = self.grpDualSpacing;

    on(ddlBuildMethod, 'change', function () {
      switch (+this.selection) {
      case BuildMethods.HORIZONTAL:
      case BuildMethods.VERTICAL:
        grpArrangement.visible = false;
        grpDualSpacing.visible = false;
        grpSoloSpacing.visible = true;
        break;
      case BuildMethods.TILED:
        grpSoloSpacing.visible = false;
        grpArrangement.visible = true;
        grpDualSpacing.visible = true;
        self.trigger('arrangement:change');
        break;
      }
    });

    on(ddlArrangeBy, 'change', function () {
      self.trigger('arrangement:change');
    });

    on(self, 'arrangement:change', function () {
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
    });
  }
});

module.exports = function ($) {
  return (new SPRITE).init($);
};
