import { ShipsFactory } from './ships'
import { GameBoard } from './gameBoard'
import { displayHit, displayMiss } from '../domChanges/playerAttack'

const player1 = {
  name: 'player1',
  turn: true,
  wins: false,
  Ships: ShipsFactory(),
  attack (element) {
    // if (player1.wins || player2.wins) {
    //   return
    // }
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
  attackArray: [],
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
    const initialCoords = this.hitsArray[0]
    console.log(this.hitsArray)
    setTimeout(() => {
      for (let i = 0; i >= this.attackArray.length; i++) {
        const check = this.attackArray[i]
        if (player2.attackArray.includes(check)) {
          this.hitsArray.shift()
          player2.attack()
          return
        }
      }
      const getLastIndex = this.attackArray.length - 1
      const element = document.getElementById(this.attackArray[getLastIndex] + 1)
      player2.attackArray.push(this.attackArray[getLastIndex] + 1)
      this.hitsArray[0].x = this.hitsArray[0].x + 1
      if (this.hitsArray.x > 9) {
        displayMiss(element)
        setTimeout(() => {
          player1.turn = true
          this.turn = false
          this.hitsArray.shift()
        }, 500)
        return
      }
      const coords = this.hitsArray[0]
      if (typeof GameBoard.player1Grid[coords.y][coords.x] === 'object') {
        const ship = GameBoard.player1Grid[coords.y][coords.x].name
        player1.Ships[ship].hit()
        displayHit(element, ship)
        this.hitsArray.push(coords)
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
    if (this.hitsArray.length > 0) {
      this.attackKnownShip()
      return
    } else if (player2.attackArray.includes(randomNumber)) {
      player2.attack()
      return
    }
    setTimeout(() => {
      player2.attackArray.push(randomNumber)
      console.log(player2.attackArray)
      const element = document.getElementById(randomNumber)
      const coords = JSON.parse(element.dataset.coords)
      if (typeof GameBoard.player1Grid[coords.y][coords.x] === 'object') {
        const ship = GameBoard.player1Grid[coords.y][coords.x].name
        player1.Ships[ship].hit()
        displayHit(element, ship)
        this.hitsArray.push(coords)
      } else {
        displayMiss(element)
      }
      setTimeout(() => {
        player1.turn = true
        this.turn = false
      }, 500)
    }, 3000)
  },
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
