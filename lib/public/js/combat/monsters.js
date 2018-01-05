MH.Combat.Monsters = function() {

  function perform_attack(monster) {
    MH.state.player.hp -= 10;
    MH.Screen.output(`${monster.name} stabs you for 10 damage.`);
  }

  return {
    perform_attack
  };
}();