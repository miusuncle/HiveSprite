var nls      = require('../config/i18n');
var defaults = require('../config/defaults');
var take     = require('../lib/take');
var on       = require('../lib/on');
var _        = require('../lib/underscore');
var util     = require('../lib/util');

var UI   = nls.UI;
var ERR  = nls.ERR;

var OUT = take({
  init: function ($) {
    this.bindCtrls($);
    this.localizeUI();
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

  bindCtrls: function ($) {
    _.each([
      'pnlOutputSettings',
      'txtOutputFolder',
      'cmdChooseFolder',

      'lblAfterBuild',
      'chkExportSpriteImage',
      'chkExportCSSFile',
      'chkCloseGeneratedDocument',
      'chkOpenOutputFolder',

      'pnlCSSExportOptions'
    ], function (name) {
      this[name] = $(name);
    }, this);
  },

  localizeUI: function () {
    this.pnlOutputSettings.text         = util.localize(UI.OUTPUT_SETTINGS);
    this.cmdChooseFolder.text           = util.localize(UI.CHOOSE_FOLDER);
    this.lblAfterBuild.text             = util.localize(UI.AFTER_BUILD);
    this.chkExportSpriteImage.text      = util.localize(UI.EXPORT_SPRITE_IMAGE);
    this.chkExportCSSFile.text          = util.localize(UI.EXPORT_CSS_FILE);
    this.chkCloseGeneratedDocument.text = util.localize(UI.CLOSE_GEN_DOC);
    this.chkOpenOutputFolder.text       = util.localize(UI.OPEN_OUTPUT_FOLDER);

    if (util.zhify()) {
      this.cmdChooseFolder.preferredSize = [120, -1];
    }
  },

  initView: function () {
    util.disable(this.txtOutputFolder);

    this.txtOutputFolder.text            = defaults.desktopFolder;
    this.chkExportSpriteImage.value      = defaults.exportSpriteImage;
    this.chkExportCSSFile.value          = defaults.exportCSSFile;
    this.chkCloseGeneratedDocument.value = defaults.closeGeneratedDocument;
    this.chkOpenOutputFolder.value       = defaults.openOutputFolder;
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
        util.alert(util.localize(ERR.UNCHK_CLOSE_DOC));
      }
    });

    on(chkOpenOutputFolder, 'click', function () {
      var exportImage = chkExportSpriteImage.value;
      var exportCSS   = chkExportCSSFile.value;
      var openFolder  = chkOpenOutputFolder.value;

      if (openFolder && !exportImage && !exportCSS) {
        chkOpenOutputFolder.value = !openFolder;
        util.alert(util.localize(ERR.UNCHK_OPEN_OUT_DIR));
      }
    });

    if (chkCloseGeneratedDocument.value) {
      _.times(2, function () {
        chkCloseGeneratedDocument.notify('onClick');
      });
    }

    if (chkOpenOutputFolder.value) {
      _.times(2, function () {
        chkOpenOutputFolder.notify('onClick');
      });
    }
  }
});

module.exports = function ($) {
  return (new OUT).init($);
};
