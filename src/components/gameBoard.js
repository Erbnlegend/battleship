import { player1, player2 } from './players'
import { Ships } from './ships'
import { getShipOrientationOptions } from '../playerInteraction'

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
  ],
  player2Grid: [
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
  ],
  // Find Possible Routes based on Grid
  determineShipOrientation: function (ship, coords, element, player) {
    const locationX = coords.x
    const locationY = coords.y
    GameBoard.testBorderOverRun(ship, locationX, player.Ships[ship].moves.forwards, player.Ships[ship].moves.backwards)
    GameBoard.testBorderOverRun(ship, locationY, player.Ships[ship].moves.down, player.Ships[ship].moves.up)
    GameBoard.testFillGrid(ship, coords, element, player)
  },
  testBorderOverRun: function (ship, location, direction1, direction2) {
    // Need check on if ship is already in as location on grid
    const shipLength = Ships[ship].length
    const sum = location + shipLength
    const diff = location - shipLength
    if (sum > 10) {
      direction1.allowed = false
    }
    if (diff < -1) {
      direction2.allowed = false
    }
  },
  testFillGrid: function (ship, coords, element, player) {
    const shipLength = Ships[ship].length
    test()
    function test (n = 0) {
      if (n >= shipLength) {
        return
      }
      if (coords.y + n <= 9) {
        if (typeof GameBoard[`${player.name}Grid`][coords.y + n][coords.x] === 'object') {
          player.Ships[ship].moves.down.allowed = false
        }
      }
      if (coords.y - n >= 0) {
        if (typeof GameBoard[`${player.name}Grid`][coords.y - n][coords.x] === 'object') {
          player.Ships[ship].moves.up.allowed = false
        }
      }
      if (coords.x + n <= 9) {
        if (typeof GameBoard[`${player.name}Grid`][coords.y][coords.x + n] === 'object') {
          player.Ships[ship].moves.forwards.allowed = false
        }
      }
      if (coords.x - n >= 0) {
        if (typeof GameBoard[`${player.name}Grid`][coords.y][coords.x - n] === 'object') {
          player.Ships[ship].moves.backwards.allowed = false
        }
      }
      test(n + 1)
    }
    // Dom Manipulation on information given
    if (player.name === 'player2') {
      return
    }
    getShipOrientationOptions(ship, coords, element, player)
  },
  deployShip: function (direction, ship, player, coords) {
    console.log(coords)
    player.Ships[ship].condition = 'deployed'
    for (const item in player.Ships) {
      if (player.Ships[item].condition === 'waiting') {
        player.Ships[item].condition = ''
      }
    }
    const shipLength = Ships[ship].length
    if (direction.text === 'forwards') {
      fillGrid()
      function fillGrid (n = 0) {
        if (n >= shipLength) {
          return
        }
        GameBoard[`${player.name}Grid`][coords.y][coords.x + n] = player.Ships[ship]
        fillGrid(n + 1)
      }
    }
    if (direction.text === 'backwards') {
      fillGrid()
      function fillGrid (n = 0) {
        if (n >= shipLength) {
          return
        }
        GameBoard[`${player.name}Grid`][coords.y][coords.x - n] = player.Ships[ship]
        fillGrid(n + 1)
      }
    }
    if (direction.text === 'down') {
      fillGrid()
      function fillGrid (n = 0) {
        if (n >= shipLength) {
          return
        }
        GameBoard[`${player.name}Grid`][coords.y + n][coords.x] = player.Ships[ship]
        fillGrid(n + 1)
      }
    }
    if (direction.text === 'up') {
      fillGrid()
      function fillGrid (n = 0) {
        if (n >= shipLength) {
          return
        }
        GameBoard[`${player.name}Grid`][coords.y - n][coords.x] = player.Ships[ship]
        fillGrid(n + 1)
      }
    }
  },
  startGame: function () {
    for (const item in player1.Ships) {
      if (player1.Ships[item].condition !== 'deployed') {
        console.log('cannot start')
        return false
      }
    }
    player2.deploy()
    return true
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
