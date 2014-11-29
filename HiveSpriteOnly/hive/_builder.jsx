var take = require('../lib/take');
var _    = require('../lib/underscore');
var dat  = require('../dat/dat');
var util = require('./util');

var Builder = take({
  constructor: function ($) {
    this.dat = dat($);
  },

  build: function () {
    _.compose(
      _.bind(this.buildCss, this),
      _.bind(this.buildSprite, this)
    )();
  },

  buildSprite: function () {
    var settings = this.dat.getData();
    // util.inspect(settings);

    var sourceImages = settings.sourceImages;
    var imagePaths = _(settings.sourceImages).pluck('path');

    // generate a fresh default document
    var doc = util.newDocument();

    // place selected images into each layer
    util.newLayersFromFiles(imagePaths.reverse());

    var layers = _.toArray(doc.layers);

    // remove the last empty layer
    layers.pop().remove();

    // obtain each layer's basic info
    var layersInfo = _.map(layers, function (layer) {
      var bounds = _.map(layer.bounds, Number);

      return {
        'layer' : layer,
        'name'  : layer.name.replace(/\s+/g, ''),
        'width' : bounds[2] - bounds[0],
        'height': bounds[3] - bounds[1]
      };
    });

    // util.inspect(layersInfo);

    // translate each layer to specified position
    var buildDirection = settings.buildDirection;
    var offsetDistance = settings.offsetDistance;

    var selectorPrefix = settings.selectorPrefix;
    var classPrefix    = settings.classPrefix;
    var selectorSuffix = settings.selectorSuffix;

    _.reduce(layersInfo, function (memoOffset, item, index) {
      var layer = item.layer;

      switch (buildDirection) {
      case 'Horizontal':
        item['backgroundPosition'] = (-memoOffset) + (memoOffset === 0 ? '' : 'px') + ' 0';
        layer.translate(index === 0 ? 0 : memoOffset, 0);
        memoOffset += item.width;
        break;
      case 'Vertical':
        item['backgroundPosition'] = '0 ' + (-memoOffset) + (memoOffset === 0 ? '' : 'px');
        layer.translate(0, index === 0 ? 0 : memoOffset);
        memoOffset += item.height;
        break;
      }

      item.selector = selectorPrefix + '.' + classPrefix + item.name + selectorSuffix;
      item.width = item.width + 'px';
      item.height = item.height + 'px';

      delete item.layer;
      delete item.name;

      memoOffset += offsetDistance;
      return memoOffset;
    }, 0);

    // util.inspect(layersInfo);

    doc.revealAll();
    doc.trim(TrimType.TRANSPARENT);

    this.saveSpriteToFile(doc, _.pick(settings, [
      'outputFolder', 'openOutputFolder'
    ]));

    if (settings.closeGeneratedDocument) {
      doc.close(SaveOptions.DONOTSAVECHANGES);
    }

    var result = _.extend({
      'cssInfo': layersInfo
    }, _.pick(settings, ['outputFolder', 'includeWidthHeight']));

    // util.inspect(result);
    return result;
  },

  saveSpriteToFile: function (doc, settings) {
    // util.inspect(settings);
    var outputFolder = settings.outputFolder;
    var openOutputFolder = settings.openOutputFolder;

    // export generated document as PNG file
    util.exportAsPNG(doc, outputFolder);

    if (openOutputFolder) {
      new Folder(outputFolder).execute();
    }
  },

  buildCss: function (settings) {
    // util.inspect(settings);
    var outputFolder = settings.outputFolder;
    var includeWidthHeight = settings.includeWidthHeight;

    var tmplCss = this.getCssTemplate(includeWidthHeight);
    var complier = _.partial(util.vsub, tmplCss);

    var contents = _.map(settings.cssInfo, complier).join('\n');
    // alert(contents);

    this.saveCssToFile(contents, outputFolder);
  },

  getCssTemplate: function (includeWidthHeight) {
    var ret = '${selector} {\n';
    ret += '\tbackground-position: ${backgroundPosition};\n';

    if (includeWidthHeight) {
      ret += '\twidth: ${width};\n';
      ret += '\theight: ${height};\n';
    }

    ret += '}\n';
    return ret;
  },

  saveCssToFile: function (contents, outputFolder) {
    util.saveAsTextFile(contents, outputFolder);
  }
});

module.exports = Builder;
