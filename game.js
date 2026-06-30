const state = {
  frame: 1
};

const frameHistory = [];
let isRestoring = false;

const mainTitle = document.getElementById('mainTitle');
const infoText = document.getElementById('infoText');
const infoImage = document.getElementById('infoImage');
const actionButtons = document.getElementById('actionButtons');
const pinAirport = document.getElementById('pinAirport');
const pinPoor = document.getElementById('pinPoor');
const pinFib = document.getElementById('pinFib');
const pinRich = document.getElementById('pinRich');
const pinBallas = document.getElementById('pinBallas');

function clearButtons() {
  actionButtons.innerHTML = '';
}

function addButton(label, onClick) {
  const btn = document.createElement('button');
  btn.className = 'btn';
  btn.textContent = label;
  btn.addEventListener('click', onClick);
  actionButtons.appendChild(btn);
}

function addBackButton() {
  if (frameHistory.length === 0) return;

  const btn = document.createElement('button');
  btn.className = 'btn';
  btn.textContent = 'Назад';
  btn.addEventListener('click', goBack);
  actionButtons.prepend(btn);
}

function goBack() {
  if (frameHistory.length === 0) return;
  isRestoring = true;
  const previousFrame = frameHistory.pop();
  setFrame(previousFrame);
}

function setFrame(frame) {
  if (!isRestoring && state.frame !== frame) {
    frameHistory.push(state.frame);
  }

  isRestoring = false;
  state.frame = frame;

  mainTitle.classList.add('hidden');
  pinAirport.classList.add('hidden');
  pinPoor.classList.add('hidden');
  pinFib.classList.add('hidden');
  pinRich.classList.add('hidden');
  pinBallas.classList.add('hidden');

  pinAirport.style.display = 'none';
  pinPoor.style.display = 'none';
  pinFib.style.display = 'none';
  pinRich.style.display = 'none';
  pinBallas.style.display = 'none';

  clearButtons();

  if (frame === 1) {
    mainTitle.classList.remove('hidden');
    document.querySelector(".bg").style.filter = "blur(8px)";
    infoImage.src = 'Bruno/bruno0.jpg';
    infoText.textContent = 'Пропущенный звонок';
    addButton('Послушать голосовое', () => setFrame(2));
  }

  if (frame === 2) {
    pinAirport.style.display = 'block';
    document.querySelector(".bg").style.filter = "blur(0px)";
    infoImage.src = 'Bruno/bruno0.jpg';
    infoText.textContent = 'Данил, привет, мне очень нужна твоя помощь. Мой друг пропал, нужно его найти, могу положиться только на тебя! Если ты согласен жду тебя в Аэропорту LS.';
    addButton('В путь', () => setFrame(3));
  }

  if (frame === 3) {
    pinPoor.style.display = 'block';
    pinFib.style.display = 'block';
    pinRich.style.display = 'block';
    pinBallas.style.display = 'block';
    infoImage.src = 'Bruno/bruno1.jpg';
    infoText.textContent = 'Я рад, что ты откликнулся на мою просьбу, теперь поедем к моим знакомым';
    addButton('Rich', () => setFrame(3.1));
    addButton('Poor', () => setFrame(3.2));
    addButton('FIB', () => setFrame(3.3));
    addButton('Ballas', () => setFrame(3.4));
  }

  if (frame === 3.1) {
    pinRich.style.display = 'block';
    infoImage.src = 'Team/Rich/rich1.webp';
    infoText.textContent = 'Это мои знакомые модники, любят хайповый шмот и крутые тачки';
    addButton('Согласен', () => setFrame(4));
  }

  if (frame === 3.2) {
    pinPoor.style.display = 'block';
    infoImage.src = 'Team/Poor/HMORI.webp';
    infoText.textContent = 'Классные типочки, любят реп, один раз они развеселили весь полицейский участок, теперь часто там ошиваются';
    addButton('Согласен', () => setFrame(4));
  }

  if (frame === 3.3) {
    pinFib.style.display = 'block';
    infoImage.src = 'Team/FIB/sisters.png';
    infoText.textContent = 'Поздоровайся это две сестрички, думаю информация о том, что они вдвоем остановили несколько каптов в гетто, даст тебе уверености в них, я пока тебя оставлю с ними, надо разобраться с работой, ты не против?';
    addButton('Газ знакомиться', () =>
    {
      selectFaction('FIB');
      setFrame(4);
    });
  }

  if (frame === 3.4) {
    pinBallas.style.display = 'block';
    infoImage.src = 'Team/Ballas/Ballas_Member_1.webp';
    infoText.textContent = 'Лучшие в своем деле, без лидера фракции возродили группировку, одним словом - легенды';
    addButton('Согласен', () => setFrame(4));
  }

  if (frame === 4) {
    document
    .querySelectorAll('.pin')
    .forEach(pin => {

        pin.style.display = 'none';

    });
    const faction = factionState.selectedFaction;
    const pinFaction = document.getElementById(faction.pin);
    pinFaction.style.display = 'block';
    infoImage.src = factionState.selectedFaction.image;
    infoText.textContent = faction.introText;
    addButton('Погнали', () => setFrame(5));
  }

  if (frame === 5) {
    document
    .querySelectorAll('.pin')
    .forEach(pin => {

        pin.style.display = 'none';

    });
    const faction = factionState.selectedFaction;
    const pinField = document.getElementById(faction.field);
    pinField.style.display = 'block';
    infoImage.src = factionState.selectedFaction.image;
    infoText.textContent = faction.secondText;
    addButton('Постараюсь', () => setFrame(5.1));
  }

if (frame === 5.1) {
  const faction = factionState.selectedFaction;
  const pinField = document.getElementById(faction.field);
  pinField.style.display = 'none';

  document.getElementById('battlefield').src = 'fields/cityhall.png';
  document.getElementById('firstPosEnemy').src = 'Enemy/firstEnemyCityHall.webp';
  document.getElementById('secondPosEnemy').src = 'Enemy/secondEnemyCityHall.webp';
  document.getElementById('thirdPosEnemy').src = 'Enemy/thirdEnemyCityHall.webp';
  document.getElementById('firstPos').src = 'Team/FIB/sisters_battle.png';
  document.getElementById('secondPos').src = 'Team/FIB/secondFIB.png';
  document.getElementById('thirdPos').src = 'Team/FIB/thirdFIB.png';

  battlefield.style.display = 'block';
  firstPosEnemy.style.display = 'block';
  secondPosEnemy.style.display = 'block';
  thirdPosEnemy.style.display = 'block';
  firstPos.style.display = 'block';
  secondPos.style.display = 'block';
  thirdPos.style.display = 'block';

  infoImage.style.display = 'none';
  infoText.textContent = 'Бой начинается';
  initBattle();
  addHoverHighlight();
}

  if (frame === 5.2) {
  battlefield.style.display = 'none';
  firstPosEnemy.style.display = 'none';
  secondPosEnemy.style.display = 'none';
  thirdPosEnemy.style.display = 'none';
  firstPos.style.display = 'none';
  secondPos.style.display = 'none';
  thirdPos.style.display = 'none';
    const faction = factionState.selectedFaction;
    const pinField = document.getElementById(faction.field);
    pinField.style.display = 'block';
    infoImage.style.display = 'block';
    pinGasStation.style.display = 'block';
    infoImage.src = factionState.selectedFaction.image;
    infoText.textContent = faction.fourthText;
    addButton('7 лет в мобилке по звёдным войнам дают о себе знать', () => setFrame(6));
  }

    if (frame === 6) {
    const faction = factionState.selectedFaction;
    const pinField = document.getElementById(faction.field);
    pinField.style.display = 'block';
    infoImage.style.display = 'block';
    pinGasStation.style.display = 'block';
    infoImage.src = factionState.selectedFaction.image;
    infoText.textContent = faction.fourthText;
    addButton('7 лет в мобилке по звёдным войнам дают о себе знать', () => setFrame(6));
  }


  addBackButton();
}

setFrame(1);