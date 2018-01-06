MH.Magic.IsolatedSpellContext = function() {
  const USE_STRICT = '"use strict"; ';
  const SCOPE_TO_HIDE = [
    'top',
    'console',
    'window',
    'self',
    'MH'
  ];

  function cast(spell_text) {
    var strict_text = USE_STRICT + spell_text;
    var scope = get_scope();
    var scoped_spell = Function(Object.keys(scope), strict_text);
    scoped_args = Object.values(scope);

    try {
      scoped_spell.apply(scope, scoped_args);
    } catch (ex) {
      handle_error(ex);
    }
  }

  function handle_error(error) {
    MH.Screen.output('The spell fails! Some or all of it fizzled.');
    MH.Screen.output('In the smoke of the failed magic you perceive the message:');
    MH.Screen.output(error.message);
  }

  function get_scope() {
    var scope = {};
    SCOPE_TO_HIDE.each((name) => scope[name] = {});
    scope.TARGETS = Array.deep_value_copy(MH.state.room.monsters);
    scope.ELEMENTS = MH.Magic.Elements;
    return scope;
  }

  return {
    cast
  }
}();