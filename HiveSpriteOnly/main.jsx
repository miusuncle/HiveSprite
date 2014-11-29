var _         = require('./lib/underscore');

var util      = require('./hive/_util');
var view      = require('./hive/_view');
var validator = require('./hive/_validator');

var bizImg    = require('./biz/_img');
var bizCss    = require('./biz/_css');
var bizSprite = require('./biz/_sprite');
var bizOut    = require('./biz/_out');

module.exports = {
  init: function () {
    var w = this.window = new Window(view);
    var $ = _.partial(util.$, w);

    var img = bizImg($);
    var sprite = bizSprite($);
    var css = bizCss($);
    var out = bizOut($);

    var ret = _.reduce([img, sprite, css, out], function (ret, which) {
      return _.extend(ret, which.getData());
    }, {});
  },

  startup: function () {
    this.init();
    this.window.center();
    this.window.show();
  }
};
