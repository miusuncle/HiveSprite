var UI      = require('../config/i18n').UI;
var rules   = require('../config/rules');
var take    = require('../lib/take');
var on      = require('../lib/on');
var _       = require('../lib/underscore');
var util    = require('../lib/util');
var Base    = require('./_base');
var Builder = require('./_builder');

var Hive = Base.take({
  init: function ($, w) {
    this.$             = $;
    this.window        = w;
    this.validateRules = rules.hivesprite;
    this.builder       = new Builder($);

    this.bindCtrls($);
    this.localizeUI();
    this.bindEvents($);
  },

  bindCtrls: function ($) {
    _.each(['cmdBuild', 'cmdCancel'], function (name) {
      this[name] = $(name);
    }, this);
  },

  localizeUI: function () {
    this.cmdBuild.text = util.localize(UI.BUILD);
    this.cmdCancel.text = util.localize(UI.CANCEL);
  },

  bindEvents: function ($) {
    var self      = this;
    var window    = self.window;
    var builder   = self.builder;
    var cmdBuild  = self.cmdBuild;
    var cmdCancel = self.cmdCancel;

    on(cmdBuild, 'click', function () {
      if (!self.isValid()) {
        return;
      }

      window.close(1);
      builder.build();
    });

    on(cmdCancel, 'click', function () {
      window.close(2);
    });
  }
});

module.exports = Hive;
