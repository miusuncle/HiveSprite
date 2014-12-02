var _      = require('../lib/underscore');
var divSrc = require('./_src');
var divOut = require('./_out');
var divCss = require('./_css');
var divSpr = require('./_spr');

module.exports = function ($) {
  var divs = [divSrc($), divOut($), divSpr($), divCss($)];

  return {
    getData: function () {
      return _.reduce(divs, function (ret, div) {
        return _.extend(ret, div.getData());
      }, {});
    }
  };
};
