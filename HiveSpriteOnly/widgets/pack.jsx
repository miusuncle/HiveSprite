var _     = require('../lib/underscore');
var pkSrc = require('./_src');
var pkOut = require('./_out');
var pkCss = require('./_css');
var pkSpr = require('./_spr');

module.exports = function ($) {
  var pks = [pkSrc($), pkOut($), pkSpr($), pkCss($)];

  return {
    getData: function () {
      return _.reduce(pks, function (ret, pk) {
        return _.extend(ret, pk.getData());
      }, {});
    }
  };
};
