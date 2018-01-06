MH.Magic.Spellbooks = function() {

  var book_0 = [{
    "name": "Magic Missile",
    "notes": "Level 0 spell does arcane damage to first target.",
    "book": 0,
    "raw_text": `
      var t = TARGETS[0];
      ELEMENTS.Arcane.inflict(t);
    `
  }];

  return [book_0];
}();
