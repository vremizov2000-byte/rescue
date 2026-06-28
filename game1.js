const state = {
  frame: 1
};

const mainTitle = document.getElementById('mainTitle');
const infoText = document.getElementById('infoText');
const brunoImage = document.getElementById('brunoImage');
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

function setFrame(frame) {
  state.frame = frame;

  mainTitle.classList.add('hidden');
  pinAirport.classList.add('hidden');
  pinPoor.classList.add('hidden');
  pinFib.classList.add('hidden');
  pinRich.classList.add('hidden');
  pinBallas.classList.add('hidden');
  clearButtons();

  if (frame === 1) {
    mainTitle.classList.remove('hidden');
    brunoImage.src = 'Bruno/bruno0.jpg';
    infoText.textContent = 'Пропущенный звонок';
    addButton('Послушать голосовое', () => setFrame(2));
  }

  if (frame === 2) {
    pinAirport.style.display = 'block';
    brunoImage.src = 'Bruno/bruno0.jpg';
    infoText.textContent = 'Данил, привет, мне очень нужна твоя помощь. Мой друг пропал, нужно его найти, могу положиться только на тебя! Если ты согласен жду тебя в Аэропорту LS.\nВ путь';
    addButton('В путь', () => setFrame(3));
  }

  if (frame === 3) {
    pinAirport.style.display = 'none';
    pinPoor.style.display = 'block';
    pinFib.style.display = 'block';
    pinRich.style.display = 'block';
    pinBallas.style.display = 'block';
    brunoImage.src = 'Bruno/bruno1.jpg';
    infoText.textContent = 'Я рад, что ты откликнулся на мою просьбу, теперь поедем к моим знакомым';
    addButton('Rich', () => console.log('Rich'));
    addButton('Poor', () => console.log('Poor'));
    addButton('FIB', () => console.log('FIB'));
    addButton('Ballas', () => console.log('Ballas'));
  }
}

setFrame(1);