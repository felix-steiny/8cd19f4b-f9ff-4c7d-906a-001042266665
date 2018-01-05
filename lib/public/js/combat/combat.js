MH.Combat.Combat = function() {

  function enter_room() {
    MH.Screen.output(
      `You enter a room with ${MH.state.room.monsters.length} monsters in it.`);
    spell_selection();
  }

  function spell_selection() {
    MH.state.options = MH.Magic.SpellLibrary.get_spell_options();
    MH.Screen.redraw();
  }

  function begin_round(selected_spell) {
    monster_turn();

    if(MH.state.player.hp <= 0) {
      player_died();
      return;
    }

    MH.Magic.SpellLibrary.cast(selected_spell);
    end_player_turn();
  }

  function player_died() {
    MH.Screen.output('The monsters fend you off.  You flee out of the room to recover.');
    MH.GameRunner.approach_room();
    MH.state.room = null;
    MH.state.player.hp = MH.state.player.max_hp;
    MH.Screen.redraw();
  }

  function monster_turn() {
    MH.state.room.monsters.each((monster) => {
      MH.Combat.Monsters.perform_attack(monster);
    });
  }

  function end_player_turn() {
    var alive_monsters = [];
    MH.state.room.monsters.each((monster) => {
      if(monster.hp > 0) {
        alive_monsters.push(monster);
      }
    });
    MH.state.room.monsters = alive_monsters;

    if(MH.state.room.monsters.length == 0) {
      player_wins();
    } else {
      spell_selection();
    }
  }

  function player_wins() {
    alert('TODO: player wins');
  }

  return {
    enter_room,
    begin_round,
    monster_turn,
    end_player_turn
  }
}();