var take = require('../lib/take');
var _    = require('../lib/underscore');
var util = require('../lib/util');

var VR = module.exports = take({
  constructor: function (target) {
    this.$ = target.$;
    this.validateRules = target.validateRules;
  },

  validate: function () {
    var validateRules = this.validateRules;
    // util.inspect(validateRules);

    if (_.isEmpty(validateRules)) {
      return true;
    }

    var result = _.chain(validateRules).inject(function (ret, rules, ctrl) {
      return _(ret).push(this.check(this.$(ctrl), rules));
    }, [], this).flatten().value();

    // util.inspect(result);
    return _.isEmpty(result) || !!alert(result[0]);
  },

  check: function (ctrl, rules) {
    return _.reduce(rules, function (ret, config, checkerName) {
      var params = config[0];

      if (_.isFunction(params)) {
        params = params.call(ctrl);
      }

      if (!VR.getChecker(checkerName)(ctrl, params)) {
        util.isObject(params) || (params = [].concat(params));
        ret.push(util.vsub(config[1], params));
      }

      return ret;
    }, [], this);
  },

  optional: function (ctrl) {
    return
  },

  depend: function (param, ctrl) {
    var dependTypes = this.dependTypes;
    var paramType = typeof param;

    if (!_.has(dependTypes, paramType)) {
      return true;
    }

    return dependTypes[paramType](param, ctrl);
  },

  dependTypes: function () {
    return {
      'boolean': _.identity,
      'function': function (param, element) {
        return param.call(null, element);
      }
    };
  }()
}, {
  _checkers: {},

  getChecker: function (name) {
    var func = this._checkers[name];

    if (!func) {
      throw Error('[' + name + '] checker does not exist');
    }

    return _.bind(func, this._checkers);
  },

  addChecker: function (name, func, checker) {
    (checker || (checker = {}))[name] = func;
    this.addCheckers(checker);
  },

  addCheckers: function (checkers) {
    // do not override existing checker
    _.defaults(this._checkers, checkers);
  }
});

VR.addCheckers({
  required: function (ctrl) {
    switch (ctrl.type) {
    case 'listbox':
      return ctrl.items.length !== 0;
    case 'edittext':
      return ctrl.text.length !== 0;

    // TODO: add checking for other control types
    // ...
    }

    return true;
  },

  startwithletter: function (ctrl) {
    return /^[a-z]/i.test(ctrl.text);
  },

  positivenumber: function (ctrl) {
    return /^\d+$/.test(ctrl.text);
  },

  range: function (ctrl, numrange) {
    if (!this.positivenumber(ctrl)) {
      return false;
    }
    var value = +ctrl.text;
    return Math.max(numrange[0], Math.min(value, numrange[1])) === value;
  },

  maxlength: function (ctrl, max) {
    return ctrl.text.length <= max;
  },

  folderpath: function (ctrl) {
    return Folder(ctrl.text).exists;
  }
});
