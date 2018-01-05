(() => {
  Array.prototype.each = function(action) {
    for(var i = 0; i < this.length; i++) {
      action(this[i], i, this);
    }
    return this;
  };

  Object.deep_value_copy = function(obj) {
    var copy = {};

    Object.keys(obj).each(function(key) {
      var value = obj[key];
      copy[key] = copy_value(value);
    });

    return copy;
  };

  Array.deep_value_copy = function(arr) {
    var copy = new Array(arr.length);

    arr.each(function(value, index) {
      copy[index] = copy_value(value);
    });

    return copy;
  };

  function copy_value(value) {
    var type = Array.isArray(value) ? 'array' : typeof(value);

    switch(type) {
      case 'function':
        return null;
      case 'object':
        return Object.deep_value_copy(value);
      case 'array':
        return Array.deep_value_copy(value);
      default:
        return value;
    }
  }
})();