var take = require('../lib/take');
var util = require('../lib/util');
var _    = require('../lib/underscore');
var pack = require('../widgets/pack');

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
    var settings = this.pack.getData();
    // util.inspect(settings);

    // generate a fresh default document
    var doc = util.newDocument();

    var layersInfo = this.populateImagesToLayers(settings, doc);
    // util.inspect(layersInfo);

    var buildFunc = ({
      'HORIZONTAL': _.bind(this.buildHorizontalSprite, this),
      'VERTICAL'  : _.bind(this.buildVerticalSprite, this),
      'GRID'      : _.bind(this.buildGridSprite, this)
    })[settings.buildMethod];

    layersInfo = buildFunc(settings, layersInfo);
    // util.inspect(layersInfo);

    // tidy up document
    doc.revealAll();
    doc.trim(TrimType.TRANSPARENT);

    // export generated document as PNG file
    util.exportAsPNG(doc, settings.outputFolder);

    // close document if necessary
    if (settings.closeGeneratedDocument) {
      doc.close(SaveOptions.DONOTSAVECHANGES);
    }

    // open output folder if necessary
    if (settings.openOutputFolder) {
      new Folder(settings.outputFolder).execute();
    }

    var pickWhiteList = ['outputFolder', 'cssFormat', 'includeWidthHeight'];

    // provide result info to outside
    var result = _.extend({
      'cssInfo': layersInfo
    }, _.pick(settings, pickWhiteList));

    // util.inspect(result);
    return result;
  },

  populateImagesToLayers: function (settings, doc) {
    var imagePaths = _(settings.sourceImages).pluck('path');

    // set doc as active document for safety
    app.activeDocuement = doc;

    // place selected images into each layer
    util.newLayersFromFiles(imagePaths.reverse());

    var layers = _.toArray(doc.layers);

    // remove the last empty layer
    layers.pop().remove();

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

  buildHorizontalSprite: function (settings, layersInfo) {
    return this.buildingSprite(settings, layersInfo, function (memoOffset, item, index) {
      item['background-position'] = (-memoOffset) + (memoOffset === 0 ? '' : 'px') + ' 0';

      // translate each layer from left to right
      item.layer.translate(index === 0 ? 0 : memoOffset, 0);
      return (memoOffset += item.width);
    });
  },

  buildVerticalSprite: function (settings, layersInfo) {
    return this.buildingSprite(settings, layersInfo, function (memoOffset, item, index) {
      item['background-position'] = '0 ' + (-memoOffset) + (memoOffset === 0 ? '' : 'px');

      // translate each layer from top to bottom
      item.layer.translate(0, index === 0 ? 0 : memoOffset);
      return (memoOffset += item.height);
    });
  },

  buildGridSprite: function (settings, layersInfo) {

  },

  buildingSprite: function (settings, layersInfo, involver) {
    var offsetDistance = settings.offsetDistance;
    var selectorPrefix = settings.selectorPrefix;
    var classPrefix    = settings.classPrefix;
    var selectorSuffix = settings.selectorSuffix;

    _.reduce(layersInfo, function (memoOffset, item, index) {
      memoOffset    = involver(memoOffset, item, index);

      item.selector = selectorPrefix + '.' + classPrefix + item.name + selectorSuffix;
      item.width    = item.width + 'px';
      item.height   = item.height + 'px';

      delete item.layer;
      delete item.name;

      memoOffset += offsetDistance;
      return memoOffset;
    }, 0);

    return layersInfo;
  },

  buildCss: function (settings) {
    // util.inspect(settings);

    var tmplCss = this.getCssTemplate(
      settings.cssFormat,
      settings.includeWidthHeight
    );

    var complier = _.partial(util.vsub, tmplCss);
    var contents = _.map(settings.cssInfo, complier).join('\n');
    // alert(contents);

    // save generated CSS to text file
    util.saveAsTextFile(contents, settings.outputFolder);
  },

  getCssTemplate: function (cssFormat, includeWidthHeight) {
    switch (cssFormat) {
    case 'Expanded': return this.expandedCssTemplate(includeWidthHeight);
    case 'Compact' : return this.compactCssTemplate(includeWidthHeight);
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
