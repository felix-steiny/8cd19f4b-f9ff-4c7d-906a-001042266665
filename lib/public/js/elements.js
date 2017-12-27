MH = window.MH || {};
MH.Elements = function() {
  var Arcane = {
    inflict: function(target) {
      target.hp -= 1;
      MH.Screen.output(`Arcane magic is inflicted upon ${target.name}.`);
    }
  };

  return {
    Arcane
  };
}();