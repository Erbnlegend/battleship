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
    const coordsArray = []
    for (const item in player2.Ships) {
      const shipName = player2.Ships[item].name[0].toLowerCase() + player2.Ships[item].name.slice(1)
      // Store on ship for placement
      let randomX = Math.floor(Math.random() * 10)
      let randomY = Math.floor(Math.random() * 10)
      const check = `x: ${randomX}, y: ${randomY}`
      if (coordsArray.includes(check)) {
        randomX = Math.floor(Math.random() * 10)
        randomY = Math.floor(Math.random() * 10)
      }
      coordsArray.push(check)
      player2.Ships[item].x = randomX
      player2.Ships[item].y = randomY

      checkDeployment(shipName)
    }
    function checkDeployment (shipName) {
      console.log(`${player2.Ships[shipName].name}`, player2.Ships[shipName].moves)
      if (!player2.Ships[shipName].moves.forwards.allowed && !player2.Ships[shipName].moves.backwards.allowed && !player2.Ships[shipName].moves.up.allowed && !player2.Ships[shipName].moves.down.allowed) {
        player2.reset(shipName)
        console.log('reset')

        let randomX = Math.floor(Math.random() * 10)
        let randomY = Math.floor(Math.random() * 10)
        const check = `x: ${randomX}, y: ${randomY}`
        if (coordsArray.includes(check)) {
          randomX = Math.floor(Math.random() * 10)
          randomY = Math.floor(Math.random() * 10)
        }
        coordsArray.push(check)
        player2.Ships[shipName].x = randomX
        player2.Ships[shipName].y = randomY
      } else if (player2.Ships[shipName].moves.up.allowed) {
        const direction = player2.Ships[shipName].moves.up
        const coords = { x: player2.Ships[shipName].x, y: player2.Ships[shipName].y }
        console.log(coords)
        const element = null

        GameBoard.determineShipOrientation(shipName, coords, element, player2)
        GameBoard.deployShip(direction, shipName, player2, coords)

        // check if backwards is allowed
      } else if (player2.Ships[shipName].moves.backwards.allowed) {
        const direction = player2.Ships[shipName].moves.backwards
        const coords = { x: player2.Ships[shipName].x, y: player2.Ships[shipName].y }
        console.log(coords)
        const element = null

        GameBoard.determineShipOrientation(shipName, coords, element, player2)
        GameBoard.deployShip(direction, shipName, player2, coords)

        // Checks if down is allowed
      } else if (player2.Ships[shipName].moves.down.allowed) {
        const direction = player2.Ships[shipName].moves.down
        const coords = { x: player2.Ships[shipName].x, y: player2.Ships[shipName].y }
        console.log(coords)
        const element = null

        GameBoard.determineShipOrientation(shipName, coords, element, player2)
        GameBoard.deployShip(direction, shipName, player2, coords)
        // Checks is forwards is allowed
      } else if (player2.Ships[shipName].moves.forwards.allowed) {
        const direction = player2.Ships[shipName].moves.forwards
        const coords = { x: player2.Ships[shipName].x, y: player2.Ships[shipName].y }
        console.log(coords)
        const element = null

        GameBoard.determineShipOrientation(shipName, coords, element, player2)
        GameBoard.deployShip(direction, shipName, player2, coords)
      }
    }
    console.log(`${this.name}`, GameBoard[`${this.name}Grid`])
  },
  reset: function (ship) {
    this.Ships[ship].moves.forwards.allowed = true
    this.Ships[ship].moves.backwards.allowed = true
    this.Ships[ship].moves.up.allowed = true
    this.Ships[ship].moves.down.allowed = true
  }
}
export { player1, player2 }
