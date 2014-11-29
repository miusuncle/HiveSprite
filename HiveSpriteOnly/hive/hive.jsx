var take      = require('../lib/take');
var on        = require('../lib/on');
var _         = require('../lib/underscore');

var Validator = require('./_validator');
var Builder   = require('./_builder');

var Hive = take({
  init: function ($, w) {
    this.window = w;
    this.builder = new Builder().init($);

    this.bindCtrls($);
    this.bindEvents($);

    return this;
  },

  bindCtrls: function ($) {
    _.each(['cmdOk', 'cmdCancel'], function (name) {
      this[name] = $(name);
    }, this);
  },

  bindEvents: function ($) {
    var window = this.window;
    var builder = this.builder;
    var cmdOk = this.cmdOk;
    var cmdCancel = this.cmdCancel;

    on(window, 'close', function () {
      var chkOpenOutputFolder = $('chkOpenOutputFolder');
      if (chkOpenOutputFolder.value) {
        return false;
      }
      return true;
    });

    on(cmdOk, 'click', function () {
      builder.buildCss();
    });
  }
});

module.exports = Hive;
