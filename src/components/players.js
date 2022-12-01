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
  attackKnownShip () {
    if (player1.wins || player2.wins) {
      return
    }

    // Check initial number to ensure not out of bounds
    if (this.hitsArray[0].initial + this.hitsArray[0].direction < 0) {
      this.hitsArray.shift()
      console.log('reset')
      this.attack()
      return
    }
    // Check initial number to ensure not out of bounds
    if (this.hitsArray[0].initial + this.hitsArray[0].direction > 99) {
      this.hitsArray.shift()
      console.log('reset')
      this.attack()
      return
    }
    // Check if next attack has already been selected - try new coords
    const number = this.hitsArray[0].initial + this.hitsArray[0].direction
    console.log(number)
    if (this.attackArray.includes(number)) {
      this.hitsArray.shift()
      console.log('reset')
      this.attack()
      return
    }

    // if greater/less than new direction - out of bounds - try new coords
    const elementCoords = document.getElementById(this.hitsArray[0].initial)
    const coordsCheck = JSON.parse(elementCoords.dataset.coords)

    if (this.hitsArray[0].text === 'forwards') {
      if (coordsCheck.x + 1 > 9) {
        console.log('reset')
        this.hitsArray.shift()
        this.attack()
        return
      }
    }
    if (this.hitsArray[0].text === 'backwards') {
      if (coordsCheck.x - 1 < 0) {
        console.log('reset')
        this.hitsArray.shift()
        this.attack()
        return
      }
    }
    if (this.hitsArray[0].text === 'up') {
      if (coordsCheck.y - 1 < 0) {
        console.log('reset')
        this.hitsArray.shift()
        this.attack()
        return
      }
    }
    if (this.hitsArray[0].text === 'down') {
      if (coordsCheck.y + 1 > 9) {
        console.log('reset')
        this.hitsArray.shift()
        this.attack()
        return
      }
    }

    setTimeout(() => {
      // Push new coords to attacked array
      const newNumber = this.hitsArray[0].initial + this.hitsArray[0].direction
      player2.attackArray.push(newNumber)

      // Element for Change!
      const element = document.getElementById(newNumber)
      const coords = JSON.parse(element.dataset.coords)

      if (typeof GameBoard.player1Grid[coords.y][coords.x] === 'object') {
        const ship = GameBoard.player1Grid[coords.y][coords.x].name
        player1.Ships[ship].hit()
        displayHit(element, ship)
        this.hitsArray[0].initial = this.hitsArray[0].initial + this.hitsArray[0].direction
        console.log(this.hitsArray)
      } else if (typeof GameBoard.player1Grid[coords.y][coords.x] !== 'object') {
        this.hitsArray.shift()
        console.log(this.hitsArray)
        displayMiss(element)
      }
      setTimeout(() => {
        player1.turn = true
        this.turn = false
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
      const element = document.getElementById(randomNumber)
      const coords = JSON.parse(element.dataset.coords)

      if (typeof GameBoard.player1Grid[coords.y][coords.x] === 'object') {
        const ship = GameBoard.player1Grid[coords.y][coords.x].name
        player1.Ships[ship].hit()
        displayHit(element, ship)
        const forwards = { initial: randomNumber, direction: 1, text: 'forwards' }
        const backwards = { initial: randomNumber, direction: -1, text: 'backwards' }
        const up = { initial: randomNumber, direction: -10, text: 'up' }
        const down = { initial: randomNumber, direction: 10, text: 'down' }
        this.hitsArray.push(forwards, backwards, up, down)
        console.log(this.hitsArray)
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
