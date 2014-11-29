var _         = require('./lib/underscore');

var util      = require('./hive/_util');
var view      = require('./hive/_view');
var validator = require('./hive/_validator');

var bizImg    = require('./biz/_img');
var bizCss    = require('./biz/_css');
var bizSprite = require('./biz/_sprite');

module.exports = {
  init: function () {
    var w = this.window = new Window(view);
    var $ = _.partial(util.$, w);

    var img = bizImg($);
    var sprite = bizSprite($);
    var css = bizCss($);
  },

  startup: function () {
    this.init();
    this.window.center();
    this.window.show();
  }
};
