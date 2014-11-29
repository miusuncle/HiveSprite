var _ = require('./underscore');

var on = function (target, type, listener) {
  if (_.isObject(type)) {
    return on.associate(target, type);
  }

  if (typeof target.on === 'function') {
    target.on(type, listener);
    return {
      remove: _(target.off).bind(target, type, listener)
    };
  }

  var eventSplitter = /\s+/;
  var parts = _.compact(type.split(eventSplitter));

  if (parts.length >= 2) {
    return on.multipart(target, parts, listener);
  }

  type = parts.pop();
  var uber = type.match(/(.+):(.+)/);

  if (uber) {
    return on.delegate.apply(on, uber.slice(-2))(target, listener);
  }

  return on.plain(target, type, listener);
};

module.exports = _.extend(on, {
  associate: function (target, pairs) {
    var handlers = _.reduce(pairs, function (ret, listener, type) {
      return _(ret).push(on(target, type, listener));
    }, []);

    handlers.remove = function () {
      _.each(handlers, _.partial(_.result, _, 'remove'));
    };

    return handlers;
  },

  multipart: function (target, types, listener) {
    var handlers = _.reduce(types, function (ret, type) {
      return _(ret).push(on(target, type, listener));
    }, []);

    handlers.remove = function () {
      _.each(handlers, _.partial(_.result, _, 'remove'));
    };

    return handlers;
  },

  delegate: function (uber, type) {
    return function (target, listener) {
      return on(target, type, function (event) {
        var eventTarget = event.target;
        if (event.target === target.findElement(uber)) {
          listener.call(eventTarget, event);
        }
      });
    };
  },

  plain: function (target, type, listener) {
    target.addEventListener(type, listener, false);
    return {
      remove: function () {
        target.removeEventListener(type, listener, false);
      }
    };
  }
});
