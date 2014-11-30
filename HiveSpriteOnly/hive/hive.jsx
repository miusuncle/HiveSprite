var take    = require('../lib/take');
var on      = require('../lib/on');
var _       = require('../lib/underscore');
var rules   = require('../config/rules');
var Base    = require('./_base');
var Builder = require('./_builder');

var Hive = Base.take({
  init: function ($, w) {
    this.$             = $;
    this.window        = w;
    this.validateRules = rules.hivesprite;
    this.builder       = new Builder($);

    this.bindCtrls($);
    this.bindEvents($);
  },

  bindCtrls: function ($) {
    _.each(['cmdBuild', 'cmdCancel'], function (name) {
      this[name] = $(name);
    }, this);
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
