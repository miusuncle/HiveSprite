var nls          = require('../config/i18n');
var defaults     = require('../config/defaults');
var settings     = require('../config/settings');
var choices      = require('../config/choices');
var take         = require('../lib/take');
var util         = require('../lib/util');
var _            = require('../lib/underscore');
var pack         = require('../divs/pack');

var ERR          = nls.ERR;
var BuildMethods = choices.BuildMethods;
var ArrangeBy    = choices.ArrangeBy;
var CSSFormats   = choices.CSSFormats;

var Builder = take({
  constructor: function ($) {
    this.pack = pack($);
  },

  build: function () {
    _.compose(
      _.bind(this.buildCss, this),
      util.defaultPixels(_.bind(this.buildSprite, this))
    )();
  },

  buildSprite: function () {
    var config = this.pack.getData();
    // util.inspect(config);

    if (_.isEmpty(config.sourceImages)) {
      var errorMessage = util.localize(ERR.NO_IMAGES);
      throw new Error(errorMessage);
    }

    // generate a fresh default document
    var doc = util.newDocument();

    var layersInfo = this.populateImagesToLayers(config, doc);
    // util.inspect(layersInfo);

    var buildFunc = (function () {
      switch (config.buildMethod) {
      case BuildMethods.HORIZONTAL : return _.bind(this.buildHorizontalSprite, this);
      case BuildMethods.VERTICAL   : return _.bind(this.buildVerticalSprite, this);
      case BuildMethods.TILED      : return _.bind(this.buildTiledSprite, this);
      case BuildMethods.GROUPED    : return _.bind(this.buildGroupedSprite, this);
      }
    }).call(this);

    layersInfo = buildFunc(config, layersInfo);
    // util.inspect(layersInfo);

    // tidy up document
    doc.revealAll();
    doc.trim(TrimType.TRANSPARENT);

    util.fitOnScreen();
    util.viewDocumentInActualSize();

    // export generated document as PNG file
    if (config.exportSpriteImage) {
      util.exportAsPNG(doc, config.outputFolder);
    }

    // close document if necessary
    if (config.closeGeneratedDocument) {
      doc.close(SaveOptions.DONOTSAVECHANGES);
    }

    // open output folder if necessary
    if (config.openOutputFolder) {
      new Folder(config.outputFolder).execute();
    }

    // save last settings if necessary
    if (settings.saveLastSettings) {
      var jsonVal = _.pick(config, _.keys(defaults));
      // util.inspect(jsonVal);

      settings.save(jsonVal);
    }

    var pickWhiteList = [
      'exportCSSFile',
      'outputFolder',
      'cssFormat',
      'includeWidthHeight'
    ];

    // provide result info to outside
    var result = _.extend({
      'cssInfo': layersInfo
    }, _.pick(config, pickWhiteList));

    // util.inspect(result);
    return result;
  },

  populateImagesToLayers: function (config, doc) {
    var imagePaths = _(config.sourceImages).pluck('path');

    // set doc as active document for safety
    app.activeDocuement = doc;

    // place selected images into each layer
    util.newLayersFromFiles(imagePaths.reverse());

    var layers = _.toArray(doc.layers);

    // remove the last empty layer
    layers.pop().remove();

    if (settings.abortOnUnknownImages && layers.length < imagePaths.length) {
      // util.inspect({ 'before': imagePaths.length, 'after': layers.length });

      // close generated document immediately
      doc.close(SaveOptions.DONOTSAVECHANGES);

      var errorMessage = util.localize(ERR.UNKNOWN_IMAGES);
      throw new Error(errorMessage);
    }

    // obtain each layer's basic info
    return _.map(layers, function (layer) {
      var bounds = _.map(layer.bounds, Number);

      return {
        'layer' : layer,
        'name'  : layer.name.replace(/\s+/g, ''),
        'width' : bounds[2] - bounds[0],
        'height': bounds[3] - bounds[1]
      };
    });
  },

  buildHorizontalSprite: function (config, layersInfo) {
    return this.buildSoloSprite(config, layersInfo, function (memoOffset, item, index) {
      item['background-position'] = (-memoOffset) + (memoOffset === 0 ? '' : 'px') + ' 0';

      // translate each layer from left to right
      item.layer.translate(memoOffset, 0);
      return (memoOffset += item.width);
    });
  },

  buildVerticalSprite: function (config, layersInfo) {
    return this.buildSoloSprite(config, layersInfo, function (memoOffset, item, index) {
      item['background-position'] = '0 ' + (-memoOffset) + (memoOffset === 0 ? '' : 'px');

      // translate layer from top to bottom
      item.layer.translate(0, memoOffset);
      return (memoOffset += item.height);
    });
  },

  buildSoloSprite: function (config, layersInfo, involver) {
    var offsetSpacing  = config.offsetSpacing;
    var selectorPrefix = config.selectorPrefix;
    var classPrefix    = config.classPrefix;
    var selectorSuffix = config.selectorSuffix;

    _.reduce(layersInfo, function (memoOffset, item, index) {
      memoOffset    = involver(memoOffset, item, index);

      item.selector = selectorPrefix + '.' + classPrefix + item.name + selectorSuffix;
      item.width    = item.width + 'px';
      item.height   = item.height + 'px';

      delete item.layer;
      delete item.name;

      return (memoOffset += offsetSpacing);
    }, 0);

    return layersInfo;
  },

  buildTiledSprite: function (config, layersInfo) {
    var selectorPrefix    = config.selectorPrefix;
    var classPrefix       = config.classPrefix;
    var selectorSuffix    = config.selectorSuffix;
    var horizontalSpacing = config.horizontalSpacing;
    var verticalSpacing   = config.verticalSpacing;
    var arrangeBy         = config.arrangeBy;
    var rowNums           = config.rowNums;

    var maxWidth  = _.chain(layersInfo).pluck('width').max().value();
    var maxHeight = _.chain(layersInfo).pluck('height').max().value();
    // util.inspect({ max_width: maxWidth, max_height: maxHeight });

    _.reduce(layersInfo, function (offset, item, index) {
      var x = offset.x;
      var y = offset.y;

      item.selector = selectorPrefix + '.' + classPrefix + item.name + selectorSuffix;
      item.width    = item.width + 'px';
      item.height   = item.height + 'px';

      item['background-position'] = [
        -x + (x === 0 ? '' : 'px'),
        -y + (y === 0 ? '' : 'px')
      ].join(' ');

      // position layer according to offset
      item.layer.translate(x, y);
      delete item.layer;
      delete item.name;

      switch (arrangeBy) {
      case ArrangeBy.ROWS:
        if (index % rowNums === rowNums - 1) {
          offset.y += (maxHeight + verticalSpacing);
          offset.x = 0;
        } else {
          offset.x += (maxWidth + horizontalSpacing);
        }
        break;
      case ArrangeBy.COLUMNS:
        if (index % rowNums === rowNums - 1) {
          offset.x += (maxWidth + horizontalSpacing);
          offset.y = 0;
        } else {
          offset.y += (maxHeight + verticalSpacing);
        }
        break;
      }

      return offset;
    }, { x: 0, y: 0 });

    return layersInfo;
  },

  buildGroupedSprite: function (config, layersInfo) {
    var horizontalSpacing = config.horizontalSpacing;
    var verticalSpacing   = config.verticalSpacing;
    var selectorPrefix    = config.selectorPrefix;
    var classPrefix       = config.classPrefix;
    var selectorSuffix    = config.selectorSuffix;

    _.reduce(config.groupedMarks, function (offset, mark) {
      // encounter one separator
      if (_.isString(mark)) {
        switch (config.arrangeBy) {
        case ArrangeBy.ROWS:
          var maxHeight = _.chain(offset.memo).pluck('height').max().value();
          offset.y += (maxHeight + verticalSpacing);
          offset.x = 0;
          break;
        case ArrangeBy.COLUMNS:
          var maxWidth = _.chain(offset.memo).pluck('width').max().value();
          offset.x += (maxWidth + horizontalSpacing);
          offset.y = 0;
          break;
        }

        // reset memo
        offset.memo.length = 0;
      } else {
        var x    = offset.x;
        var y    = offset.y;
        var item = layersInfo[offset.index++];

        if (!item) {
          return offset;
        }

        // util.inspect(_.pick(item, ['width', 'height']))
        offset.memo.push(_.pick(item, ['width', 'height']));

        switch (config.arrangeBy) {
        case ArrangeBy.ROWS:
          offset.x += (item.width + horizontalSpacing);
          break;
        case ArrangeBy.COLUMNS:
          offset.y += (item.height + verticalSpacing);
          break;
        }

        item.selector = selectorPrefix + '.' + classPrefix + item.name + selectorSuffix;
        item.width    = item.width + 'px';
        item.height   = item.height + 'px';

        item['background-position'] = [
          -x + (x === 0 ? '' : 'px'),
          -y + (y === 0 ? '' : 'px')
        ].join(' ');

        // position layer according to offset
        item.layer.translate(x, y);
        delete item.layer;
        delete item.name;
      }

      // util.inspect(offset.memo);
      return offset;
    }, { x: 0, y: 0, index: 0, memo: [] });

    return layersInfo;
  },

  buildCss: function (config) {
    // util.inspect(config);

    if (!config.exportCSSFile) {
      return;
    }

    var tmplCss = this.getCssTemplate(
      config.cssFormat,
      config.includeWidthHeight
    );

    var compiled = _.partial(util.vsub, tmplCss);
    var contents = _.map(config.cssInfo, compiled).join('\n');
    // util.alert(contents);

    // save generated CSS to text file
    util.saveAsTextFile(contents, config.outputFolder);
  },

  getCssTemplate: function (cssFormat, includeWidthHeight) {
    switch (cssFormat) {
    case CSSFormats.EXPANDED: return this.expandedCssTemplate(includeWidthHeight);
    case CSSFormats.COMPACT : return this.compactCssTemplate(includeWidthHeight);
    }
  },

  expandedCssTemplate: function (includeWidthHeight) {
    var ret = '${selector} {\n';
    includeWidthHeight && (ret += '\twidth: ${width};\n\theight: ${height};\n');
    ret += '\tbackground-position: ${background-position};\n';
    return (ret += '}\n');
  },

  compactCssTemplate: function (includeWidthHeight) {
    var ret = '${selector} {';
    includeWidthHeight && (ret += ' width: ${width}; height: ${height};');
    return (ret += ' background-position: ${background-position}; }');
  }
});

module.exports = Builder;
