import { player1 } from './players'
import { showShipOrientationOptions } from '../dom'

const GameBoard = {
  player1Grid: [
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '']
  ], // Determines if ship can be placed in certain locations
  moves: {
    forwards: { allowed: true, text: 'forwards' },
    backwards: { allowed: true, text: 'backwards' },
    up: { allowed: true, text: 'up' },
    down: { allowed: true, text: 'down' }
  }, // Find Possible Routes based on Grid
  possibleRoutes: function (ship, location, direction1, direction2) {
    const shipLength = player1.Ships[ship].length
    const sum = location + shipLength
    const diff = location - shipLength
    if (sum > 10) {
      direction1.allowed = false
    }
    if (diff < -1) {
      direction2.allowed = false
    }
  },
  determineShipOrientation: function (ship, coords, element) {
    if (player1.Ships[ship].condition === 'placed') {
      return
    }
    player1.Ships[ship].condition = 'placed'
    const locationX = coords.x
    const locationY = coords.y
    GameBoard.possibleRoutes(ship, locationX, GameBoard.moves.forwards, GameBoard.moves.backwards)
    GameBoard.possibleRoutes(ship, locationY, GameBoard.moves.down, GameBoard.moves.up)
    // Dom Manipulation on information given
    showShipOrientationOptions(GameBoard.moves, element, ship)
  },
  deployShip: function (direction, element, ship) {
    
  }
}

// function deployShip (n = 0) {
//   if (n >= player1.Ships[ship].length) {
//     return
//   }
//   GameBoard.player1Grid[coords.y][coords.x + n] = ship
//   deployShip(n + 1)
// }

export { GameBoard }
