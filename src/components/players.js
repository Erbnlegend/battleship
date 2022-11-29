import { Ships } from './ships'
import { GameBoard } from './gameBoard'

const player1 = {
  name: 'player1',
  Ships,
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
  Ships,
  attack: function (coords) {
    console.log(`${coords} attacked`)
  },
  deploy: function () {
    for (const item in this.Ships) {
      console.log(`${this.Ships[item].name}`, this.Ships[item].moves)
    }
    for (const item in this.Ships) {
      const element = null
      const randomX = Math.floor(Math.random() * 10)
      const randomY = Math.floor(Math.random() * 10)
      const coords = { x: randomX, y: randomY }
      const name = this.Ships[item].name
      const shipName = name[0].toLowerCase() + name.slice(1)
      GameBoard.determineShipOrientation(shipName, coords, element, player2)

      recheckDeploymentOptions(this)
      function recheckDeploymentOptions (player) {
        // Check if up is allowed
        if (player.Ships[shipName].moves.up.allowed) {
          const direction = player.Ships[shipName].moves.up

          GameBoard.deployShip(direction, shipName, player, coords)
          GameBoard.determineShipOrientation(shipName, coords, element, player2)
          // check if forwards is allowed
        } else if (player.Ships[shipName].moves.forwards.allowed) {
          const direction = player.Ships[shipName].moves.forwards

          GameBoard.deployShip(direction, shipName, player, coords)

          GameBoard.determineShipOrientation(shipName, coords, element, player2)
          // Checks if backwards is allowed
        } else if (player.Ships[shipName].moves.backwards.allowed) {
          const direction = player.Ships[shipName].moves.backwards

          GameBoard.deployShip(direction, shipName, player, coords)

          GameBoard.determineShipOrientation(shipName, coords, element, player2)
          // Checks is down is allowed
        } else if (player.Ships[shipName].moves.down.allowed) {
          const direction = player.Ships[shipName].moves.down

          GameBoard.deployShip(direction, shipName, player, coords)

          GameBoard.determineShipOrientation(shipName, coords, element, player2)
        }
      }
    }
    for (const item in this.Ships) {
      console.log(`${this.Ships[item].name}`, this.Ships[item].condition)
    }
    console.log(GameBoard[`${this.name}Grid`])
  },
  reset: function (ship) {
    this.Ships[ship].moves.forwards.allowed = true
    this.Ships[ship].moves.backwards.allowed = true
    this.Ships[ship].moves.up.allowed = true
    this.Ships[ship].moves.down.allowed = true
  }
}
export { player1, player2 }
