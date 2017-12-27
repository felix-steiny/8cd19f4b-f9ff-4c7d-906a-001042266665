MH = window.MH || {};
MH.GameRunner = function() {
  function approach_room() {
    MH.Screen.output('You approach a room.  What do you do?');
    MH.state.options = [{
      text: 'Enter Room',
      action: enter_room
    },
    {
      text: 'Look at Spell Book',
      action: () => alert('todo')
    }];

    if(MH.state.room_number == 0) {
      MH.state.options[1]['disabled'] = true;
    }
  }

  function enter_room() {
    MH.state.options = MH.SpellLibrary.get_spell_options();
    fetch_room(MH.state.room_number)
      .catch((error) => console.error(error))
      .then((result) => MH.state.room = result.room)
      .then(() => MH.Screen.output(
        `You enter a room with ${MH.state.room.monsters.length} monsters in it.`))
      .then(() => MH.Screen.redraw());
  }

  function fetch_room() {
    var room_number = MH.state.room_number;
    var url = `content/rooms/room_${room_number}.json`;
    return $.get({url: url, dataType: 'json'});
  }

  return {
    approach_room
  };
}();