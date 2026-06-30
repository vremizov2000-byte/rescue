const factions = {
  FIB: {
    id: 'FIB',
    name: 'FIB',
    hp: 100,
    minAttack: 13,
    maxAttack: 16,
    speed: 3,
    image: 'Team/FIB/sisters.png',
    pin: 'pinFib',
    field: 'pinCityHall',
    introText: 'Привет, если хочешь получить от нас помощь, то нужно будет разобраться с нашими делами, поехали в Мэрию, там нужно сделать пару делишек',
    secondText: 'В Мэрии было покушение, сейчас там два подозреваемых их надо будет ликвидировать. Они предъявляют невыполнимые требования. От тебя требуется малое, главное под пулю не попади',
    thirdText: 'Ты замечаешь напряженную ситуацию, два грозных мужчины держат в заложниках людей в холле Мэрии, сейчас начнётся перестрелка...',
    fourthText: 'Не знали, что ты такой искуссный тактик, благодаря твоему руководству мы расправились с этим ублюдком, теперь я думаю пора заняться твоим делом, поехали на заправку, вроде там надо встретиться с Бруно'
  }
};

const factionState = {
  selectedFaction: null
};

function selectFaction(id) {
    factionState.selectedFaction = factions[id] || null;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getFactionAttack() {
  const f = factionState.selectedFaction;
  if (!f) return 0;
  return getRandomInt(f.minAttack, f.maxAttack);
}