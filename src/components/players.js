import { ShipsFactory } from './ships'
import { GameBoard } from './gameBoard'
import { displayHit, displayMiss } from '../domChanges/playerAttack'

const player1 = {
  name: 'player1',
  turn: true,
  wins: false,
  Ships: ShipsFactory(),
  attack (element) {
    if (player1.wins || player2.wins) {
      return
    }
    if (element.classList.contains('triggered') || !this.turn) {
      return
    }
    if (this.turn) {
      const coords = JSON.parse(element.dataset.coords)
      if (typeof GameBoard.player2Grid[coords.y][coords.x] === 'object') {
        const ship = GameBoard.player2Grid[coords.y][coords.x].name
        player2.Ships[ship].hit()
        displayHit(element, ship)
        console.log(player2.Ships[ship])
      } else {
        displayMiss(element)
      }
      player2.turn = true
      this.turn = false
    }
    player2.attack()
  },
  reset (ship) {
    this.Ships[ship].moves.forwards.allowed = true
    this.Ships[ship].moves.backwards.allowed = true
    this.Ships[ship].moves.up.allowed = true
    this.Ships[ship].moves.down.allowed = true
  }
}

const player2 = {
  name: 'player2',
  turn: false,
  wins: false,
  Ships: ShipsFactory(),
  // All Attacks
  attackArray: [],
  // Hits - cleared after sinking ships
  hitsArray: [],
  tests: {
    testForwards: { condition: false, key: 'x', value: '+ 1' },
    testDown: { condition: false, key: 'y', value: '- 1' },
    testback: { condition: false, key: 'x', value: '- 1' },
    testUp: { condition: false, key: 'y', value: '+ 1' }
  },
  attackKnownShip () {
    if (player1.wins || player2.wins) {
      return
    }

    // Check if next attack has already been selected - try new coords
    // need to check attacksArray and hitsArray
    const check = this.hitsArray[0] + 1
    if (player2.attackArray.includes(check)) {
      this.hitsArray.shift()
      player2.attack()
      return
    }

    // if greater than 9 - out of bounds - try new coords
    // Get NEXT element - push to attack array
    const getLastIndex = this.attackArray.length - 1
    const elementCoords = document.getElementById(this.attackArray[getLastIndex])
    const lastHitCoords = elementCoords.dataset.coords
    if (lastHitCoords.x === 9) {
      // Will add next coords to attack to sink ship
      this.attack()
      return
    }

    setTimeout(() => {
      // Get NEXT element - push to attack array
      const getLastIndex = this.attackArray.length - 1
      const element = document.getElementById(this.attackArray[getLastIndex] + 1)
      const coords = JSON.parse(element.dataset.coords)
      player2.attackArray.push(this.attackArray[getLastIndex] + 1)

      const checkForwards = { x: coords.x, y: coords.y }

      if (typeof GameBoard.player1Grid[checkForwards.y][checkForwards.x] === 'object') {
        const ship = GameBoard.player1Grid[checkForwards.y][checkForwards.x].name
        player1.Ships[ship].hit()
        displayHit(element, ship)
        this.hitsArray.push(element)
      }
      // if (typeof GameBoard.player1Grid[coords.y][coords.x] !== 'object' && !this.tests.forwards) {
      //   this.tests.forwards.condition = true
      //   initialCoords.x - 1
      //   this.hitsArray.push(initialCoords)
      // }
      else {
        displayMiss(element)
      }
      setTimeout(() => {
        player1.turn = true
        this.turn = false
        this.hitsArray.shift()
      }, 500)
    }, 3000)
  },
  attack () {
    if (player1.wins || player2.wins) {
      return
    }
    const randomNumber = Math.floor(Math.random() * 100)
    // If hit on previous play, attack next coordinates near hit - stop this function
    if (this.hitsArray.length > 0) {
      this.attackKnownShip()
      return
      // If the coords/number is already picked previously, restart
    } else if (this.attackArray.includes(randomNumber)) {
      player2.attack()
      return
    }

    setTimeout(() => {
      this.attackArray.push(randomNumber)
      console.log(player2.attackArray)
      const element = document.getElementById(randomNumber)
      const coords = JSON.parse(element.dataset.coords)

      if (typeof GameBoard.player1Grid[coords.y][coords.x] === 'object') {
        const ship = GameBoard.player1Grid[coords.y][coords.x].name
        player1.Ships[ship].hit()
        displayHit(element, ship)
        this.hitsArray.push(randomNumber)
      } else {
        displayMiss(element)
      }

      setTimeout(() => {
        player1.turn = true
        this.turn = false
      }, 500)
    }, 3000)
  },
  // Need to store coords for ships to ensure ship coords are not picked twice
  coordsArray: [],
  deploy () {
    for (const item in this.Ships) {
      const shipName = this.Ships[item].name
      // Store on ship for placement
      let randomX = Math.floor(Math.random() * 10)
      let randomY = Math.floor(Math.random() * 10)
      const check = `x: ${randomX}, y: ${randomY}`
      if (this.coordsArray.includes(check)) {
        randomX = Math.floor(Math.random() * 10)
        randomY = Math.floor(Math.random() * 10)
      }
      this.coordsArray.push(check)
      this.Ships[item].x = randomX
      this.Ships[item].y = randomY

      this.checkDeployment(shipName)
    }
  },
  checkDeployment (shipName) {
    const coords = { x: this.Ships[shipName].x, y: this.Ships[shipName].y }
    GameBoard.determineShipOrientation(shipName, coords, null, this)

    // Make sure that all move options are not false
    if (!this.Ships[shipName].moves.forwards.allowed && !this.Ships[shipName].moves.backwards.allowed && !this.Ships[shipName].moves.up.allowed && !this.Ships[shipName].moves.down.allowed) {
      this.reset(shipName)

      let randomX = Math.floor(Math.random() * 10)
      let randomY = Math.floor(Math.random() * 10)
      const check = `x: ${randomX}, y: ${randomY}`
      if (this.coordsArray.includes(check)) {
        randomX = Math.floor(Math.random() * 10)
        randomY = Math.floor(Math.random() * 10)
      }
      this.coordsArray.push(check)
      this.Ships[shipName].x = randomX
      this.Ships[shipName].y = randomY

      const coords = { x: this.Ships[shipName].x, y: this.Ships[shipName].y }
      GameBoard.determineShipOrientation(shipName, coords, null, this)
      let direction
      chooseDirection()
      function chooseDirection () {
        if (player2.Ships[shipName].moves.forwards) {
          direction = player2.Ships[shipName].moves.forwards
        } else if (player2.Ships[shipName].moves.down) {
          direction = player2.Ships[shipName].moves.down
        } else if (player2.Ships[shipName].moves.up) {
          direction = player2.Ships[shipName].moves.up
        } else if (player2.Ships[shipName].moves.backwards) {
          direction = player2.Ships[shipName].moves.backwards
        }
        GameBoard.deployShip(direction, shipName, player2, coords)
      }
    } else if (this.Ships[shipName].moves.forwards.allowed && this.Ships[shipName].moves.backwards.allowed) {
      const direction = this.Ships[shipName].moves.forwards
      GameBoard.determineShipOrientation(shipName, coords, null, this)
      GameBoard.deployShip(direction, shipName, this, coords)

      // add extra randomization
    } else if (this.Ships[shipName].moves.up.allowed && this.Ships[shipName].moves.down.allowed) {
      const direction = this.Ships[shipName].moves.down
      GameBoard.determineShipOrientation(shipName, coords, null, this)
      GameBoard.deployShip(direction, shipName, this, coords)

      // Check if up is allowed
    } else if (this.Ships[shipName].moves.up.allowed) {
      const direction = this.Ships[shipName].moves.up
      // Check Orientation on each placement so there are no overwrites
      GameBoard.determineShipOrientation(shipName, coords, null, this)
      GameBoard.deployShip(direction, shipName, this, coords)

      // check if backwards is allowed
    } else if (this.Ships[shipName].moves.backwards.allowed) {
      const direction = this.Ships[shipName].moves.backwards
      // Check Orientation on each placement so there are no overwrites
      GameBoard.determineShipOrientation(shipName, coords, null, this)
      GameBoard.deployShip(direction, shipName, this, coords)

      // Checks if down is allowed
    } else if (this.Ships[shipName].moves.down.allowed) {
      const direction = this.Ships[shipName].moves.down
      // Check Orientation on each placement so there are no overwrites
      GameBoard.determineShipOrientation(shipName, coords, null, this)
      GameBoard.deployShip(direction, shipName, this, coords)

      // Checks is forwards is allowed
    } else if (this.Ships[shipName].moves.forwards.allowed) {
      const direction = this.Ships[shipName].moves.forwards
      // Check Orientation on each placement so there are no overwrites
      GameBoard.determineShipOrientation(shipName, coords, null, this)
      GameBoard.deployShip(direction, shipName, this, coords)
    }
  },
  reset (ship) {
    this.Ships[ship].moves.forwards.allowed = true
    this.Ships[ship].moves.backwards.allowed = true
    this.Ships[ship].moves.up.allowed = true
    this.Ships[ship].moves.down.allowed = true
  }
}
export { player1, player2 }
