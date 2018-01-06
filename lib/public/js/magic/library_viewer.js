MH.Magic.LibraryViewer = function() {

  var selected_spell = null;

  function get_selected_spell() { return selected_spell; }

  function init_editor() {
    MH.spell_editor = ace.edit('spell_editor');
    MH.spell_editor.setTheme('ace/theme/twilight');
    MH.spell_editor.session.setMode('ace/mode/javascript');
    MH.spell_editor.$blockScrolling = Infinity; //Ace says to do this.
    MH.Public.spell_editor = MH.spell_editor; //TEMPORARY
  }

  function toggle_visibility(on) {
    $('.modal_overlay').toggle(on);
    $('.library_viewer').toggle(on);
    if(on) {
      redraw();
      if(selected_spell == null) {
        $('.catalog_pane button').first().click();
      }
    }
  }
  MH.Public.close_library_viewer = () => toggle_visibility(false);

  function redraw() {
    var catalog = $('.catalog_pane');
    catalog.empty();

    catalog.append($('<h3>').text('Hacks'));
    MH.state.player.hacks.each( (hack) => {
      catalog.append(
        $('<button>')
          .text(hack.name)
          .click(() => select_spell(hack, false))
      );
    });

    catalog.append($('<h3>').text('Spells'));
    MH.state.player.spells.each( (spell) => {
      catalog.append(
        $('<button>')
          .text(spell.name)
          .click(() => select_spell(spell, true))
      );
    });
  }

  function select_spell(spell, isReadOnly) {
    selected_spell = spell;
    MH.spell_editor.setValue(spell.raw_text);
    MH.spell_editor.gotoLine(0);
    MH.spell_editor.setReadOnly(isReadOnly);
    $('.info_pane .spell_name input').val(spell.name).prop('readonly', isReadOnly);
    $('.info_pane .spell_notes input').val(spell.notes).prop('readonly', isReadOnly);
    $('.info_pane button#save').toggle(!isReadOnly);
  }

  return {
    toggle_visibility,
    init_editor,
    select_spell,
    get_selected_spell,
    redraw
  };
}();