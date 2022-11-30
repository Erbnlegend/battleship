import { ShipsFactory } from './ships'
import { GameBoard } from './gameBoard'

const player1 = {
  name: 'player1',
  Ships: ShipsFactory(),
  attack: function (coords) {
    console.log(`${coords} attacked`)
  },
  reset: function (ship) {
    this.Ships[ship].moves.forwards.allowed = true
    this.Ships[ship].moves.backwards.allowed = true
    this.Ships[ship].moves.up.allowed = true
    this.Ships[ship].moves.down.allowed = true
  }
}
const player2 = {
  name: 'player2',
  Ships: ShipsFactory(),
  attack: function (coords) {
    console.log(`${coords} attacked`)
  },
  coordsArray: [],
  deploy () {
    for (const item in this.Ships) {
      const shipName = this.Ships[item].name[0].toLowerCase() + this.Ships[item].name.slice(1)
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

      console.log(this.Ships[item].name, this.Ships[item].x, this.Ships[item].y)
    }
  },
  checkDeployment (shipName) {
    console.log(`${this.Ships[shipName].name}`, this.Ships[shipName].moves)
    // Make sure that all move options are not false
    if (!this.Ships[shipName].moves.forwards.allowed && !this.Ships[shipName].moves.backwards.allowed && !this.Ships[shipName].moves.up.allowed && !this.Ships[shipName].moves.down.allowed) {
      this.reset(shipName)
      console.log('reset')

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
    } else if (this.Ships[shipName].moves.up.allowed) {
      const direction = this.Ships[shipName].moves.up
      const coords = { x: this.Ships[shipName].x, y: this.Ships[shipName].y }
      const element = null

      GameBoard.determineShipOrientation(shipName, coords, element, this)
      GameBoard.deployShip(direction, shipName, this, coords)

      // check if backwards is allowed
    } else if (this.Ships[shipName].moves.backwards.allowed) {
      const direction = this.Ships[shipName].moves.backwards
      const coords = { x: this.Ships[shipName].x, y: this.Ships[shipName].y }
      const element = null

      GameBoard.determineShipOrientation(shipName, coords, element, this)
      GameBoard.deployShip(direction, shipName, this, coords)

      // Checks if down is allowed
    } else if (this.Ships[shipName].moves.down.allowed) {
      const direction = this.Ships[shipName].moves.down
      const coords = { x: this.Ships[shipName].x, y: this.Ships[shipName].y }
      const element = null

      GameBoard.determineShipOrientation(shipName, coords, element, this)
      GameBoard.deployShip(direction, shipName, this, coords)
      // Checks is forwards is allowed
    } else if (this.Ships[shipName].moves.forwards.allowed) {
      const direction = this.Ships[shipName].moves.forwards
      const coords = { x: this.Ships[shipName].x, y: this.Ships[shipName].y }
      const element = null

      GameBoard.determineShipOrientation(shipName, coords, element, this)
      GameBoard.deployShip(direction, shipName, this, coords)
    }
    console.log(GameBoard.player2Grid)
  },
  reset: function (ship) {
    this.Ships[ship].moves.forwards.allowed = true
    this.Ships[ship].moves.backwards.allowed = true
    this.Ships[ship].moves.up.allowed = true
    this.Ships[ship].moves.down.allowed = true
  }
}
export { player1, player2 }
