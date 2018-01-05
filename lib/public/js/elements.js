MH.Magic.Elements = function() {

  var Arcane = function() {
    function inflict(target) {
      var real_target = MH.state.room.monsters.filter((m) => m.id == target.id)[0];
      real_target.hp -= 1;
      MH.Screen.output(`Arcane magic is inflicted upon ${real_target.name}.`);
    }

    return {
      inflict
    };
  }();

  return {
    Arcane
  };
}();