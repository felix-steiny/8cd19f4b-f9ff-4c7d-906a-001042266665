MH.Magic.LibraryViewer = function() {

  function init_editor() {
    MH.spell_editor = ace.edit('spell_editor');
    MH.spell_editor.setTheme('ace/theme/twilight');
    MH.spell_editor.session.setMode('ace/mode/javascript');
    MH.spell_editor.$blockScrolling = Infinity; //Ace says to do this.
    MH.Public.spell_editor = MH.spell_editor; //TEMPORARY
  }

  MH.Public.close_library_viewer = () => toggle_visibility(false);

  function toggle_visibility(on) {
    $('.modal_overlay').toggle(on);
    $('.library_viewer').toggle(on);
    if(on) { redraw(); }
  }

  function redraw() {
    var catalog_ul = $('.catalog_pane ul');
    catalog_ul.empty();

    MH.state.player.spells.each( (spell) => {
      catalog_ul.append(
        $('<button>')
          .text(spell.name)
          .click(() => select_spell(spell))
      );
    });
  }

  function select_spell(spell) {
    MH.spell_editor.setValue(spell.raw_text);
    MH.spell_editor.gotoLine(0);
    if(true) {
      MH.spell_editor.setReadOnly(true);
    }
  }

  return {
    toggle_visibility,
    init_editor
  };
}();