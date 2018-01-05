MH.Screen = function() {

  function redraw() {
    var state = MH.state;
    draw_stats();
    draw_options(state.options);
    if(state.room) {
      draw_monsters(state.room.monsters);
    } else {
      clear_monsters();
    }
  }

  function output(text) {
    var textarea = $('#output');
    var cur = textarea.text();
    textarea.text(cur + '\n' + text);
    textarea.scrollTop(textarea[0].scrollHeight);
  }

  function draw_options(options) {
    var options_div = $('.options');
    options_div.empty();

    options.each(function(option) {
      var action_and_redraw = function() {
        option.action();
        redraw();
      };

      options_div.append(
        $('<button>')
          .text(option.text)
          .click(action_and_redraw))
    });
  }

  function draw_stats() {
    var player = MH.state.player;
    var stats_div = $('.player .stats');
    stats_div.toggle(player != null);
    if(player == null) { return; }

    var update_text = (stat, value) =>
      $(`.player .stats .${stat} span.value`).text(value);

    update_text('name', player.name);
    update_text('health', player.hp);
    update_text('mana', player.mana);
  }

  function draw_monsters(monster_arr) {
    var monsters_div = $('.monsters');
    monsters_div.empty();

    monster_arr.each(function(monster) {
      portrait = $('<div class="monster">');
      portrait.append($('<div>').text(monster.name));
      portrait.append($('<div>').text('HP: ' + monster.hp));
      monsters_div.append(portrait);
    });
  }

  function clear_monsters() {
    var monsters_div = $('.monsters');
    monsters_div.empty();
  }

  return {
    output,
    redraw
  };
}();