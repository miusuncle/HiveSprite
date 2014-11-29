var _    = require('./lib/underscore');
var util = require('./hive/util');
var view = require('./hive/view');
var Hive = require('./hive/hive');

module.exports = {
  startup: function () {
    var w = this.window = new Window(view);
    var $ = _.partial(util.$, w);

    new Hive().init($, w);

    w.center();
    w.show();
  }
};
