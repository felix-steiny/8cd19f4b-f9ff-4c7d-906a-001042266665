MH.Magic.Hacks = function() {

  function create_new_hack() {
    var hack = {
      index: MH.state.player.hacks.length,
      name: 'Unnamed',
      notes: '',
      raw_text: ''
    };
    MH.state.player.hacks[hack.index] = hack;
    MH.Magic.LibraryViewer.redraw();
    MH.Magic.LibraryViewer.select_spell(hack, false);
  }
  MH.Public.create_new_hack = create_new_hack;

  function save_hack() {
    var hack = MH.Magic.LibraryViewer.get_selected_spell();

    hack.name = $('.info_pane .spell_name input').val();
    hack.notes = $('.info_pane .spell_notes input').val();
    hack.raw_text = MH.spell_editor.getValue();

    MH.state.player.hacks[hack.index] = hack;
    MH.Magic.LibraryViewer.redraw();
  }
  MH.Public.save_hack = save_hack;

}();