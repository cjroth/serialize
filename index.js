var serialize = function(obj) {
  if (!obj) return obj;
  if (obj instanceof Array) {
    return obj.map(function(key) {
      return serialize(key);
    });
  }
  if (typeof obj.serialize === 'function') {
    return serialize(obj.serialize());
  }
  if (typeof obj === 'object') {
    for (var i in obj) {
      obj[i] = serialize(obj[i]);
    }
    return obj;
  }
  return obj;
};

var middleware = function(req, res, next) {
  res.serialize = function(data) {
    data = serialize(data);
     res[typeof data === 'string' ? 'send' : 'json'].apply(res, arguments);
  };
  next();
};

module.exports = serialize;
module.exports.middleware = middleware;