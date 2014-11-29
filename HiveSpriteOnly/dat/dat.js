var _         = require('../lib/underscore');
var datImg    = require('./_img');
var datCss    = require('./_css');
var datSprite = require('./_sprite');
var datOut    = require('./_out');

module.exports = function ($) {
  var dats = [datImg($), datSprite($), datCss($), datOut($)];

  return {
    getData: function () {
      return _.reduce(dats, function (ret, dat) {
        return _.extend(ret, dat.getData());
      }, {});
    }
  };
};
