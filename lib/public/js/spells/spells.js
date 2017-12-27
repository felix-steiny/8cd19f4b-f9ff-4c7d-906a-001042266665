MH = window.MH || {};
MH.Spellbooks = function() {

  var book_0 = [{
    "name": "Magic Missile",
    "book": 0,
    "method": function() {
      t = MH.state.room.monsters[0];
      MH.Elements.Arcane.inflict(t);
    }
  }];

  return [book_0];
}();
