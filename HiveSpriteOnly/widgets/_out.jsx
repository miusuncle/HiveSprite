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
      exportSpriteImage     : this.chkExportSpriteImage.value,
      exportCSSFile         : this.chkExportCSSFile.value,
      closeGeneratedDocument: this.chkCloseGeneratedDocument.value,
      openOutputFolder      : this.chkOpenOutputFolder.value
    };
  },

  initView: function () {
    this.txtOutputFolder.text = util.desktopFolder;
    util.disable(this.txtOutputFolder);

    this.chkExportSpriteImage.value      = true;
    this.chkExportCSSFile.value          = true;
    this.chkCloseGeneratedDocument.value = true;
    this.chkOpenOutputFolder.value       = true;
  },

  bindCtrls: function ($) {
    _.each([
      'cmdChooseFolder',
      'txtOutputFolder',
      'chkExportSpriteImage',
      'chkExportCSSFile',
      'chkCloseGeneratedDocument',
      'chkOpenOutputFolder',
      'pnlCSSExportOptions'
    ], function (name) {
      this[name] = $(name);
    }, this);
  },

  bindEvents: function () {
    var self                      = this;
    var cmdChooseFolder           = self.cmdChooseFolder;
    var txtOutputFolder           = self.txtOutputFolder;
    var chkExportSpriteImage      = self.chkExportSpriteImage;
    var chkExportCSSFile          = self.chkExportCSSFile;
    var chkCloseGeneratedDocument = self.chkCloseGeneratedDocument;
    var chkOpenOutputFolder       = self.chkOpenOutputFolder;
    var pnlCSSExportOptions       = self.pnlCSSExportOptions;

    on(cmdChooseFolder, 'click', function () {
      var folder = Folder.selectDialog();

      if (folder) {
        txtOutputFolder.text = folder.fsName;
      }
    });

    on(chkExportSpriteImage, 'click', function () {
      var exportImage = chkExportSpriteImage.value;
      var exportCSS   = chkExportCSSFile.value;

      if (!exportImage) {
        chkCloseGeneratedDocument.value = false;

        if (!exportCSS) {
          chkOpenOutputFolder.value = false;
        }
      }
    });

    on(chkExportCSSFile, 'click', function () {
      var exportImage = chkExportSpriteImage.value;
      var exportCSS   = chkExportCSSFile.value;

      if (exportCSS) {
        util.enableRecursive(pnlCSSExportOptions);
      } else {
        util.disableRecursive(pnlCSSExportOptions);

        if (!exportImage) {
          chkOpenOutputFolder.value = false;
        }
      }
    });

    on(chkCloseGeneratedDocument, 'click', function () {
      var exportImage   = chkExportSpriteImage.value;
      var closeDocument = chkCloseGeneratedDocument.value;

      if (!exportImage && closeDocument) {
        chkCloseGeneratedDocument.value = !closeDocument;

        var message = 'You can only have Close Generated Document checked ';
        message += 'if you choose to export sprite image.';
        alert(message);
      }
    });

    on(chkOpenOutputFolder, 'click', function () {
      var exportImage = chkExportSpriteImage.value;
      var exportCSS   = chkExportCSSFile.value;
      var openFolder  = chkOpenOutputFolder.value;

      if (openFolder && !exportImage && !exportCSS) {
        chkOpenOutputFolder.value = !openFolder;

        var message = 'It\'s only make sense to Open Output Folder ';
        message += 'if at least export sprite image or CSS file enabled.';
        alert(message);
      }
    });
  }
});

module.exports = function ($) {
  return (new OUT).init($);
};
