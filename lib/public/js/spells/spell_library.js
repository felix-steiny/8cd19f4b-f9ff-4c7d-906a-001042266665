MH = window.MH || {};
MH.SpellLibrary = function() {
  function populate_spells() {
    var spells = [];
    for(var i = 0; i <= MH.state.player.spellbook_level; i++) {
      var copies = MH.Spellbooks[i].map((spell) => copy_spell(spell));
      spells = spells.concat(copies);
    }

    spells.each((spell) => spell.is_active = !spell['default_inactive']);

    MH.state.player.spells = spells;
  }

  function get_spell_options() {
    var result = MH.state.player.spells.filter((spell) => spell.is_active);
    return result.map((spell) => ({
        text: spell.name,
        action: () => cast(spell)
      }));
  }

  function cast(spell) {
    MH.Screen.output(`You cast ${spell.name}.`);
    spell.method();
  }

  function copy_spell(spell) {
    var copy = {};
    Object.keys(spell).each((key) => copy[key] = spell[key]);
    return copy;
  }

  return {
    get_spell_options,
    populate_spells
  };
}();