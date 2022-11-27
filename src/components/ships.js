const Ships = {
  carrier: {
    name: 'Carrier',
    url: './imgs/aircraftcarrierBig.svg',
    length: 5,
    hitPoints: 5,
    sunk: false,
    condition: ''
  },
  battleship: {
    name: 'Battleship',
    url: './imgs/battleshipBig.svg',
    length: 4,
    hitPoints: 4,
    sunk: false,
    condition: ''
  },
  destroyer: {
    name: 'Destroyer',
    url: './imgs/destroyerBig.svg',
    length: 3,
    hitPoints: 3,
    sunk: false,
    condition: ''
  },
  warship: {
    name: 'Warship',
    url: '../imgs/warshipBig.svg',
    length: 3,
    hitPoints: 3,
    sunk: false,
    condition: ''
  },
  patrol: {
    name: 'Patrol',
    url: './imgs/patrolBig.svg',
    length: 2,
    hitPoints: 2,
    sunk: false,
    condition: ''
  },
  hit: function (name) {
    if (this[name].hitPoints === 0) {
      return
    }
    if (this[name].hitPoints === 1) {
      this.sunkShip(name)
    }
    this[name].hitPoints--
  },
  sunkShip: function (name) {
    this[name].sunk = true
  }
}

export { Ships }
