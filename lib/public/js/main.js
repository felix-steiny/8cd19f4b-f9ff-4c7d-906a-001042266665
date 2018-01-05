MH.Main = function() {

  MH.Public.initialize = function() {
    MH.state = {};
    // TEMPORARY //
    MH.Public.state = MH.state;
    ///////////////
    MH.Magic.LibraryViewer.init_editor();
    pre_game();
  };

  function pre_game() {
    MH.Screen.output('Welcome to Magical Hack!');
    MH.state.options = [{
      text: 'Start Game',
      action: start_game
    }];

    MH.Screen.redraw();
  }

  function start_game() {
    MH.state.player = {
      name: 'Lilypop',
      level: 0,
      max_hp: 50,
      hp: 50,
      max_mana: 100,
      mana: 100,
      spellbook_level: 0
    };
    MH.Magic.SpellLibrary.populate_spells();

    MH.state.room_number = 0;

    MH.Screen.output(`New Game, your name is ${MH.state.player.name}.`);
    MH.GameRunner.approach_room();
  }
}();