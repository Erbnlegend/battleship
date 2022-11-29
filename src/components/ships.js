const Ships = {
  carrier: {
    name: 'Carrier',
    url: './imgs/aircraftcarrierBig.svg',
    length: 5,
    hitPoints: 5,
    sunk: false,
    // Test player 2
    condition: '',
    moves: {
      forwards: { text: 'forwards', allowed: true, deg: 0, origin: 'center left' },
      backwards: { text: 'backwards', allowed: true, deg: -180, origin: '30px' },
      up: { text: 'up', allowed: true, deg: -90, origin: '30px' },
      down: { text: 'down', allowed: true, deg: 90, origin: '30px' }
    },
    hit: function () {
      if (this.hitPoints === 0) {
        return
      }
      if (this.hitPoints === 1) {
        this.sunkShip()
      }
      this.hitPoints--
    },
    sunkShip: function () {
      this.sunk = true
    }
  },
  battleship: {
    name: 'Battleship',
    url: './imgs/battleshipBig.svg',
    length: 4,
    hitPoints: 4,
    sunk: false,
    // Test player 2
    condition: '',
    moves: {
      forwards: { text: 'forwards', allowed: true, deg: 0, origin: 'center left' },
      backwards: { text: 'backwards', allowed: true, deg: -180, origin: '30px' },
      up: { text: 'up', allowed: true, deg: -90, origin: '30px' },
      down: { text: 'down', allowed: true, deg: 90, origin: '30px' }
    },
    hit: function () {
      if (this.hitPoints === 0) {
        return
      }
      if (this.hitPoints === 1) {
        this.sunkShip()
      }
      this.hitPoints--
    },
    sunkShip: function () {
      this.sunk = true
    }
  },
  destroyer: {
    name: 'Destroyer',
    url: './imgs/destroyerBig.svg',
    length: 3,
    hitPoints: 3,
    sunk: false,
    // Test player 2
    condition: '',
    moves: {
      forwards: { text: 'forwards', allowed: true, deg: 0, origin: 'center left' },
      backwards: { text: 'backwards', allowed: true, deg: -180, origin: '30px' },
      up: { text: 'up', allowed: true, deg: -90, origin: '30px' },
      down: { text: 'down', allowed: true, deg: 90, origin: '30px' }
    },
    hit: function () {
      if (this.hitPoints === 0) {
        return
      }
      if (this.hitPoints === 1) {
        this.sunkShip()
      }
      this.hitPoints--
    },
    sunkShip: function () {
      this.sunk = true
    }
  },
  warship: {
    name: 'Warship',
    url: '../imgs/warshipBig.svg',
    length: 3,
    hitPoints: 3,
    sunk: false,
    // Test player 2
    condition: '',
    moves: {
      forwards: { text: 'forwards', allowed: true, deg: 0, origin: 'center left' },
      backwards: { text: 'backwards', allowed: true, deg: -180, origin: '30px' },
      up: { text: 'up', allowed: true, deg: -90, origin: '30px' },
      down: { text: 'down', allowed: true, deg: 90, origin: '30px' }
    },
    hit: function () {
      if (this.hitPoints === 0) {
        return
      }
      if (this.hitPoints === 1) {
        this.sunkShip()
      }
      this.hitPoints--
    },
    sunkShip: function () {
      this.sunk = true
    }
  },
  patrol: {
    name: 'Patrol',
    url: './imgs/patrolBig.svg',
    length: 2,
    hitPoints: 2,
    sunk: false,
    // Test player 2
    condition: '',
    moves: {
      forwards: { text: 'forwards', allowed: true, deg: 0, origin: 'center left' },
      backwards: { text: 'backwards', allowed: true, deg: -180, origin: '30px' },
      up: { text: 'up', allowed: true, deg: -90, origin: '30px' },
      down: { text: 'down', allowed: true, deg: 90, origin: '30px' }
    },
    hit: function () {
      if (this.hitPoints === 0) {
        return
      }
      if (this.hitPoints === 1) {
        this.sunkShip()
      }
      this.hitPoints--
    },
    sunkShip: function () {
      this.sunk = true
    }
  }

}

export { Ships }
