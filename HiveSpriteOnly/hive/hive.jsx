var take      = require('../lib/take');
var on        = require('../lib/on');
var _         = require('../lib/underscore');

var Validator = require('./_validator');
var Builder   = require('./_builder');

var Hive = take({
  init: function ($, w) {
    this.window = w;

    this.validator = new Validator($);
    this.builder = new Builder($);

    this.bindCtrls($);
    this.bindEvents($);

    return this;
  },

  bindCtrls: function ($) {
    _.each(['cmdBuild', 'cmdCancel'], function (name) {
      this[name] = $(name);
    }, this);
  },

  bindEvents: function ($) {
    var window = this.window;
    var validator = this.validator;
    var builder = this.builder;
    var cmdBuild = this.cmdBuild;
    var cmdCancel = this.cmdCancel;

    on(cmdBuild, 'click', function () {
      if (!validator.isValid()) {
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
