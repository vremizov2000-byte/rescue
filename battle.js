const battleState = {
  started: false,
  finished: false,
  turnOrder: [],
  turnIndex: 0,
  attackMode: false,
  waitingForTarget: false,
  activeUnit: null
};

function getRandomDamage(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getAliveUnits(side) {
  return Object.values(battleUnits).filter(u => u.side === side && u.hp > 0);
}

function getUnitElement(unitId) {
  return document.getElementById(unitId);
}

function getHpElement(unitId) {
  return document.getElementById(unitId + 'Hp');
}

function updateBattleUI() {
  for (const unit of Object.values(battleUnits)) {
    const hpEl = document.getElementById(unit.id + 'Hp');
    if (hpEl) hpEl.textContent = `${unit.hp}/${unit.maxHp}`;

    const el = document.getElementById(unit.id);
    if (el) {
      if (unit.hp <= 0) {
        el.style.display = 'none';
        if (hpEl) hpEl.style.display = 'none';
      } else {
        el.style.display = 'block';
        if (hpEl) hpEl.style.display = 'block';
      }
    }
  }
}

function clearTurnHighlight() {
  Object.values(battleUnits).forEach(unit => {
    const el = getUnitElement(unit.id);
    if (el) el.classList.remove('active-turn');
  });
}

function setTurnHighlight(unitId) {
  clearTurnHighlight();
  const el = getUnitElement(unitId);
  if (el) el.classList.add('active-turn');
}

function buildTurnOrder() {
  const enemies = ['firstPosEnemy', 'secondPosEnemy', 'thirdPosEnemy']
    .map(id => battleUnits[id])
    .filter(u => u && u.hp > 0);

  const allies = ['firstPos', 'secondPos', 'thirdPos']
    .map(id => battleUnits[id])
    .filter(u => u && u.hp > 0);

  battleState.turnOrder = [...allies, ...enemies];
  battleState.turnIndex = 0;
}

function checkBattleEnd() {
  const enemiesAlive = getAliveUnits('enemy').length;
  const alliesAlive = getAliveUnits('ally').length;

  if (enemiesAlive === 0) {
    battleState.finished = true;
    infoText.textContent = 'Победа';
    clearButtons();
  battlefield.style.display = 'none';
  firstPosEnemy.style.display = 'none';
  secondPosEnemy.style.display = 'none';
  thirdPosEnemy.style.display = 'none';
  firstPos.style.display = 'none';
  secondPos.style.display = 'none';
  thirdPos.style.display = 'none';
    clearTurnHighlight();
        setFrame(
    Number(
        (state.frame + 0.1).toFixed(1)
    )
);
    return true;
  }

  if (alliesAlive === 0) {
    battleState.finished = true;
    infoText.textContent = 'Поражение';
    clearButtons();
    clearTurnHighlight();
    return true;
  }

  return false;
}

function nextTurn() {
  if (battleState.finished) return;
  if (checkBattleEnd()) return;

  if (!battleState.turnOrder.length) {
    buildTurnOrder();
  }

  let safety = 0;
  while (safety < 20) {
    if (battleState.turnIndex >= battleState.turnOrder.length) {
      buildTurnOrder();
    }

    const unit = battleState.turnOrder[battleState.turnIndex];
    battleState.turnIndex += 1;

    if (!unit || unit.hp <= 0) {
      safety += 1;
      continue;
    }

    battleState.activeUnit = unit;
    setTurnHighlight(unit.id);

    if (unit.side === 'enemy') {
      battleState.attackMode = false;
      battleState.waitingForTarget = false;
      infoText.textContent = `${unit.id} ходит`;

      setTimeout(() => {
        if (battleState.finished || unit.hp <= 0) return;
        enemyAct(unit);
      }, 600);
    } else {
      battleState.attackMode = true;
      battleState.waitingForTarget = true;
      infoText.textContent = `${unit.id} ходит`;
      clearButtons();
      addButton('Атака', startPlayerAttack);
    }

    return;
  }
}

function enemyAct(unit) {
  if (battleState.finished) return;
  if (unit.hp <= 0) {
    nextTurn();
    return;
  }

  const targets = getAliveUnits('ally');
  if (!targets.length) {
    checkBattleEnd();
    return;
  }

  const target = targets[Math.floor(Math.random() * targets.length)];
  const dmg = getRandomDamage(unit.minAttack, unit.maxAttack);

  target.hp = Math.max(0, target.hp - dmg);
  infoText.textContent = `${unit.id} атакует ${target.id} на ${dmg}`;

  updateBattleUI();

  if (checkBattleEnd()) return;

  setTimeout(() => {
    nextTurn();
  }, 600);
}

function startPlayerAttack() {
  if (battleState.finished) return;
  if (!battleState.waitingForTarget || !battleState.activeUnit) return;
  if (battleState.activeUnit.side !== 'ally') return;

  battleState.attackMode = true;
  infoText.textContent = 'Выбери цель';
}

function attackTarget(targetId) {
  if (battleState.finished) return;
  if (!battleState.attackMode || !battleState.waitingForTarget) return;

  const attacker = battleState.activeUnit;
  const target = battleUnits[targetId];

  if (!attacker || attacker.side !== 'ally') return;
  if (!target || target.hp <= 0 || target.side !== 'enemy') return;

  const dmg = getRandomDamage(attacker.minAttack, attacker.maxAttack);
  target.hp = Math.max(0, target.hp - dmg);

  infoText.textContent = `${attacker.id} атакует ${target.id} на ${dmg}`;
  battleState.attackMode = false;
  battleState.waitingForTarget = false;

  updateBattleUI();

  if (checkBattleEnd()) return;

  clearButtons();
  setTimeout(() => {
    nextTurn();
  }, 600);
}

function bindBattleTargets() {
  document.getElementById('firstPosEnemy').onclick = () => attackTarget('firstPosEnemy');
  document.getElementById('secondPosEnemy').onclick = () => attackTarget('secondPosEnemy');
  document.getElementById('thirdPosEnemy').onclick = () => attackTarget('thirdPosEnemy');
}

function initBattle() {
  if (battleState.started) return;
  battleState.started = true;
  battleState.finished = false;
  battleState.attackMode = false;
  battleState.waitingForTarget = false;
  battleState.activeUnit = null;
  document.querySelector(".bg").style.filter = "blur(8px)";
  
  battlefield.style.display = 'block';
  firstPosEnemy.style.display = 'block';
  secondPosEnemy.style.display = 'block';
  thirdPosEnemy.style.display = 'block';
  firstPos.style.display = 'block';
  secondPos.style.display = 'block';
  thirdPos.style.display = 'block';

  bindBattleTargets();
  updateBattleUI();
  clearButtons();
  buildTurnOrder();
  nextTurn();
}

function addHoverHighlight() {
  ['firstPosEnemy', 'secondPosEnemy', 'thirdPosEnemy'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    el.addEventListener('mouseenter', () => {
      if (battleState.finished) return;
      el.classList.add('hover-target');
    });

    el.addEventListener('mouseleave', () => {
      el.classList.remove('hover-target');
    });
  });
}
