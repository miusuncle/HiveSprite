var take = require('../lib/take');
var on   = require('../lib/on');
var _    = require('../lib/underscore');
var util = require('../lib/util');

var OUT = take({
  init: function ($) {
    this.bindCtrls($);
    this.initView();
    this.bindEvents();
    return this;
  },

  getData: function () {
    return {
      outputFolder          : this.txtOutputFolder.text,
      closeGeneratedDocument: this.chkCloseGeneratedDocument.value,
      openOutputFolder      : this.chkOpenOutputFolder.value
    };
  },

  initView: function () {
    util.disable(this.txtOutputFolder);
    this.chkCloseGeneratedDocument.value = true;
    this.chkOpenOutputFolder.value = true;
  },

  bindCtrls: function ($) {
    _.each([
      'cmdChooseFolder',
      'txtOutputFolder',
      'chkCloseGeneratedDocument',
      'chkOpenOutputFolder'
    ], function (name) {
      this[name] = $(name);
    }, this);
  },

  bindEvents: function () {
    var self = this;
    var cmdChooseFolder = self.cmdChooseFolder;
    var txtOutputFolder = self.txtOutputFolder;

    on(cmdChooseFolder, 'click', function () {
      var folder = Folder.selectDialog();

      if (folder) {
        txtOutputFolder.text = folder.fsName;
      }
    });
  }
});

module.exports = function ($) {
  return (new OUT).init($);
};
