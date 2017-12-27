Array.prototype.each = function(action) {
  for(var i = 0; i < this.length; i++) {
    action(this[i], i);
  }
}