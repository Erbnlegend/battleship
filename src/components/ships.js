function ShipsFactory () {
  return {
    carrier: {
      name: 'carrier',
      url: './imgs/aircraftcarrierBig.svg',
      length: 5,
      hitPoints: 5,
      sunk: false,
      condition: '',
      moves: {
        forwards: { text: 'forwards', allowed: true, deg: 0, origin: 'center left' },
        backwards: { text: 'backwards', allowed: true, deg: -180, origin: '30px' },
        up: { text: 'up', allowed: true, deg: -90, origin: '30px' },
        down: { text: 'down', allowed: true, deg: 90, origin: '30px' }
      },
      x: '',
      y: '',
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
      name: 'battleship',
      url: './imgs/battleshipBig.svg',
      length: 4,
      hitPoints: 4,
      sunk: false,
      condition: '',
      moves: {
        forwards: { text: 'forwards', allowed: true, deg: 0, origin: 'center left' },
        backwards: { text: 'backwards', allowed: true, deg: -180, origin: '30px' },
        up: { text: 'up', allowed: true, deg: -90, origin: '30px' },
        down: { text: 'down', allowed: true, deg: 90, origin: '30px' }
      },
      x: '',
      y: '',
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
      name: 'destroyer',
      url: './imgs/destroyerBig.svg',
      length: 3,
      hitPoints: 3,
      sunk: false,
      condition: '',
      moves: {
        forwards: { text: 'forwards', allowed: true, deg: 0, origin: 'center left' },
        backwards: { text: 'backwards', allowed: true, deg: -180, origin: '30px' },
        up: { text: 'up', allowed: true, deg: -90, origin: '30px' },
        down: { text: 'down', allowed: true, deg: 90, origin: '30px' }
      },
      x: '',
      y: '',
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
      name: 'warship',
      url: '../imgs/warshipBig.svg',
      length: 3,
      hitPoints: 3,
      sunk: false,
      condition: '',
      moves: {
        forwards: { text: 'forwards', allowed: true, deg: 0, origin: 'center left' },
        backwards: { text: 'backwards', allowed: true, deg: -180, origin: '30px' },
        up: { text: 'up', allowed: true, deg: -90, origin: '30px' },
        down: { text: 'down', allowed: true, deg: 90, origin: '30px' }
      },
      x: '',
      y: '',
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
      name: 'patrol',
      url: './imgs/patrolBig.svg',
      length: 2,
      hitPoints: 2,
      sunk: false,
      condition: '',
      moves: {
        forwards: { text: 'forwards', allowed: true, deg: 0, origin: 'center left' },
        backwards: { text: 'backwards', allowed: true, deg: -180, origin: '30px' },
        up: { text: 'up', allowed: true, deg: -90, origin: '30px' },
        down: { text: 'down', allowed: true, deg: 90, origin: '30px' }
      },
      x: '',
      y: '',
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
}

export { ShipsFactory }
