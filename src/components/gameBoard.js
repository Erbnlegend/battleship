import { player1, player2 } from './players'
import { ShipsFactory } from './ships'
import { getShipOrientationOptions } from '../domChanges/placeShips'
import { win } from '../domChanges/playerAttack'

const ShipsBlueprint = ShipsFactory()

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
  determineShipOrientation (ship, coords, element, player) {
    const locationX = coords.x
    const locationY = coords.y
    this.testBorderOverRun(ship, locationX, player.Ships[ship].moves.forwards, player.Ships[ship].moves.backwards)
    this.testBorderOverRun(ship, locationY, player.Ships[ship].moves.down, player.Ships[ship].moves.up)
    this.testFillGrid(ship, coords, element, player)
  },
  // Tests if the ship will overrun the edges of the board x: 0 - 9, y: 0 - 9
  testBorderOverRun (ship, location, direction1, direction2) {
    const shipLength = ShipsBlueprint[ship].length
    const sum = location + shipLength
    const diff = location - shipLength
    if (sum > 10) {
      direction1.allowed = false
    }
    if (diff < -1) {
      direction2.allowed = false
    }
  },
  // Tests if a ship will hit another ship before placement
  testFillGrid (ship, coords, element, player) {
    const shipLength = ShipsBlueprint[ship].length
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
    // Skip Arrow Selection for computer
    if (player.name === 'player2') {
      return
    }

    // Dom Manipulation for user input
    getShipOrientationOptions(ship, coords, element, player)
  },
  // add ship to Grid based on player
  deployShip (direction, ship, player, coords) {
    player.Ships[ship].condition = 'deployed'
    for (const item in player.Ships) {
      if (player.Ships[item].condition === 'waiting') {
        player.Ships[item].condition = ''
      }
    }
    const shipLength = ShipsBlueprint[ship].length
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
  // Begin button tells if ships are all placed and starts computer deployment
  startGame () {
    for (const item in player1.Ships) {
      if (player1.Ships[item].condition !== 'deployed') {
        return false
      }
    }
    player2.deploy()
    return true
  },
  checkWin (player) {
    if (player.Ships.carrier.sunk && player.Ships.battleship.sunk && player.Ships.destroyer.sunk && player.Ships.warship.sunk && player.Ships.patrol.sunk) {
      win(player)
      return true
    }
  }
}

export { GameBoard }
