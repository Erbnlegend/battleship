import { GameBoard } from './components/gameBoard'
import { player1 } from './components/players'
import { createElement, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide';

// Create elements for the icons
const up = createElement(ChevronUp)
const down = createElement(ChevronDown)
const left = createElement(ChevronLeft)
const right = createElement(ChevronRight)
// Give Icons Classes
up.classList.add('up')
down.classList.add('down')
left.classList.add('left')
right.classList.add('right')

const DOMElements = {
  board: document.querySelector('#board'),
  ships: document.querySelector('#ships')
}

// Click Ship and run player Function
function selectShip () {
  const allShips = [...document.querySelectorAll('.ship')]
  allShips.forEach(element => {
    const name = element.dataset.name
    const matchCase = name[0].toLowerCase() + name.slice(1)
    const shipName = matchCase
    element.addEventListener('click', (e) => {
      element.style.backgroundColor = 'rgba(0, 128, 0, .5)'
      chooseCoords(shipName)
    })
  })
}

// Launched from selecting a Ship to place
function chooseCoords (ship) {
  if (ship.condition === 'placed') {
    return
  }
  const tiles = [...document.querySelectorAll('.tile')]
  tiles.forEach(element => {
    const getCoords = element.dataset.coords
    const coords = JSON.parse(getCoords)
    element.addEventListener('click', (e) => {
      GameBoard.determineShipOrientation(ship, coords, element)
    })
  })
}

function showShipOrientationOptions (moves, element, ship) {
  const intId = parseInt(element.id)
  const shipLength = player1.Ships[ship].length
  if (moves.up.allowed) {
    element.append(up)
    element.addEventListener('click', () => {
      GameBoard.deployShip('up', element, ship)
    })
  }
  if (moves.forwards.allowed) {
    element.append(right)
    element.addEventListener('click', () => {
      GameBoard.deployShip('right', element, ship)
    })
  }
  if (moves.backwards.allowed) {
    element.append(left)
    element.addEventListener('click', () => {
      GameBoard.deployShip('left', element, ship)
    })
  }
  if (moves.down.allowed) {
    element.append(down)
    element.addEventListener('click', () => {
      GameBoard.deployShip('down', element, ship)
    })
  }
}

export { DOMElements, selectShip, showShipOrientationOptions }
