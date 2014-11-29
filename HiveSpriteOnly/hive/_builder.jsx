var take = require('../lib/take');
var _    = require('../lib/underscore');
var dat  = require('../dat/dat');

var Builder = take({
  init: function ($) {
    this.settings = dat($).getData();
    return this;
  },

  build: function () {
    this.buildSprite();
    this.buildCss();
  },

  buildSprite: function () {
    var settings = this.settings;
    alert('buildSprite');
  },

  buildCss: function () {
    var settings = this.settings;
    alert('buildCss');
  }
});

module.exports = Builder;
