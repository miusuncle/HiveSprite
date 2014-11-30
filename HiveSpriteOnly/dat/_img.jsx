var take = require('../lib/take');
var on   = require('../lib/on');
var _    = require('../lib/underscore');
var util = require('../lib/util');

var IMG = take({
  init: function ($) {
    this.dataList = [];

    this.bindCtrls($);
    this.initView();
    this.bindEvents();
    this.reviveView();

    return this;
  },

  getData: function () {
    return {
      sourceImages: _.clone(this.dataList)
    };
  },

  bindCtrls: function ($) {
    _.each([
      'ddlBrowseUse',
      'lstSourceImages',
      'cmdBrowse',
      'cmdRemoveAll',
      'cmdRemove',
      'cmdMoveUp',
      'cmdMoveDown'
    ], function (name) {
      this[name] = $(name);
    }, this);
  },

  initView: function () {
    var Uses = this.Uses = { 'Files': 0, 'Folder': 1 };

    // initialize dropdownlist `Browse Use`
    _.each(Uses, function (index, text) {
      this.ddlBrowseUse.add('item', text);
    }, this);

    // `Browse Use` default to `Folder`
    this.ddlBrowseUse.selection = 1;
    this.renderListBox();
  },

  renderListBox: function () {
    this.lstSourceImages.removeAll();

    _.each(this.dataList, function (item) {
      this.lstSourceImages.add('item', item['name']);
    }, this);
  },

  bindEvents: function () {
    var self = this;
    var ddlBrowseUse = self.ddlBrowseUse;
    var lstSourceImages = self.lstSourceImages;
    var cmdBrowse = self.cmdBrowse;
    var cmdRemoveAll = self.cmdRemoveAll;
    var cmdRemove = self.cmdRemove;
    var cmdMoveUp = self.cmdMoveUp;
    var cmdMoveDown = self.cmdMoveDown;

    on(cmdBrowse, 'click', function () {
      var images;

      switch (+ddlBrowseUse.selection) {
      case self.Uses.Files:
        images = File.openDialog(undefined, util.dialogFilter(), true);
        break;
      case self.Uses.Folder:
        var folder = Folder.selectDialog();
        images = folder && util.getAllImages(folder);
        break;
      }

      // filling data list with image info
      _.reduce(images || [], function (ret, image) {
        return _(ret).push({
          name: image.name,
          path: image.fsName
        });
      }, self.dataList);

      // remove duplicates
      self.dataList = _.uniq(self.dataList, _.property('path'));

      self.renderListBox();
      self.trigger('listbox:update');
    });

    on(cmdRemoveAll, 'click', function () {
      lstSourceImages.removeAll();
      self.dataList.length = 0;
      self.trigger('listbox:update');
    });

    on(cmdRemove, 'click', function () {
      var selection = lstSourceImages.selection;
      var stayIndex = Math.max(0, selection[0].index - 1);

      _.foldr(selection, function (yes, item, index) {
        index = item.index;
        lstSourceImages.remove(index);
        self.dataList.splice(index, 1);
      }, 'ignore me?');

      lstSourceImages.selection = stayIndex;
      self.trigger('listbox:update');
    });

    on(cmdMoveUp, 'click', function () {
      var item = lstSourceImages.selection[0];
      var idx = item.index - 1;
      var dataList = self.dataList;

      dataList.splice.apply(
        dataList,
        [idx, 2].concat(
          dataList.slice(idx, idx + 2).reverse()
        )
      );

      self.renderListBox();
      lstSourceImages.selection = idx;

      self.trigger('listbox:update');
    });

    on(cmdMoveDown, 'click', function () {
      var item = lstSourceImages.selection[0];
      var idx = item.index;
      var dataList = self.dataList;

      dataList.splice.apply(
        dataList,
        [idx, 2].concat(
          dataList.slice(idx, idx + 2).reverse()
        )
      );

      self.renderListBox();
      lstSourceImages.selection = idx + 1;

      self.trigger('listbox:update');
    });

    on(lstSourceImages, 'click change', updateListBox);
    on(self, { 'listbox:update': updateListBox });

    function updateListBox() {
      var selection = lstSourceImages.selection;
      var items = lstSourceImages.items;
      var length = items.length;

      if (!length) {
        util.disable([cmdRemoveAll, cmdRemove, cmdMoveUp, cmdMoveDown]);
      } else if (!selection) {
        util.enable(cmdRemoveAll);
        util.disable([cmdRemove, cmdMoveUp, cmdMoveDown]);
      } else if (selection.length === 1) {
        if (length === 1) {
          util.disable([cmdMoveUp, cmdMoveDown]);
        } else {
          switch (selection[0].index) {
          case 0:
            util.disable(cmdMoveUp);
            util.enable(cmdMoveDown);
            break;
          case length - 1:
            util.disable(cmdMoveDown);
            util.enable(cmdMoveUp);
            break;
          default:
            util.enable([cmdMoveUp, cmdMoveDown]);
            break;
          }
        }

        util.enable([cmdRemoveAll, cmdRemove]);
      } else {
        util.enable([cmdRemoveAll, cmdRemove]);
        util.disable([cmdMoveUp, cmdMoveDown]);
      }
    }
  },

  reviveView: function () {
    this.trigger('listbox:update');
  }
});

module.exports = function ($) {
  return (new IMG).init($);
};
