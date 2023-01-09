import { GameBoard } from '../components/gameBoard'
import { player1 } from '../components/players'
import { createElement, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Check } from 'lucide'

// Stores clicked Elements for removing on different tile click
let storeElements = []

let width = window.innerWidth

const getSize = () => {
  width = window.innerWidth
}
window.addEventListener('resize', getSize)

const DOMElements = {
  display: document.querySelector('#displayInfo'),
  board: document.querySelector('#board'),
  ships: document.querySelector('#ships'),
  start: document.querySelector('#start'),
  attackBoard: document.querySelector('#attackBoard'),
  enemyShips: document.querySelector('#enemyShips')

}

// Begin Battle button
DOMElements.start.addEventListener('click', () => {
  const start = GameBoard.startGame()
  if (start) {
    const attackTile = [...document.querySelectorAll('.attackTile')]
    attackTile.forEach(element => {
      element.addEventListener('click', () => {
        player1.attack(element)
      })
    })
    DOMElements.start.style.display = 'none'
    DOMElements.display.textContent = 'Fire When Ready'
  }
  if (!start) {
    DOMElements.start.innerHTML = 'You must deploy your entire fleet'
  }
})

// Add CheckMarks as ships are placed onto the board
function addConfirmChecks (e) {
  const check = createElement(Check)
  check.classList.add('confirm')
  e.target.append(check)
}

// Click Ship and run player Function
function selectShip () {
  const allShips = [...document.querySelectorAll('.ship')]
  allShips.forEach(element => {
    const shipName = element.dataset.name
    element.addEventListener('click', (e) => {
      chooseCoords(e, shipName)
    })
  })
}

// Launched from selecting a Ship to place
function chooseCoords (shipElement, ship) {
  // Does not allow already placed, waiting for placement or currently placed ship to be placed
  if (player1.Ships[ship].condition === 'waiting' || player1.Ships[ship].condition === 'active' || player1.Ships[ship].condition === 'deployed') {
    return
  }
  // Set Condition so only one ship can be placed at a time
  for (const item in player1.Ships) {
    if (player1.Ships[item].condition === '') {
      player1.Ships[item].condition = 'waiting'
    }
  }
  // Set clicked Ship to active
  player1.Ships[ship].condition = 'active'
  addConfirmChecks(shipElement)

  const tiles = [...document.querySelectorAll('.tile')]
  tiles.forEach(element => {
    const getCoords = element.dataset.coords
    const coords = JSON.parse(getCoords)
    element.addEventListener('click', (e) => {
      GameBoard.determineShipOrientation(ship, coords, element, player1)

      // Stores Element if clicked
      storeElements.push(element.id)

      // Remove previous elements children if new selection is made
      if (storeElements.length > 1) {
        if (player1.Ships[ship].condition === 'placed') {
          return
        }
        clearPreviousSelectedElement()
        player1.reset(ship)
        GameBoard.determineShipOrientation(ship, coords, element, player1)
      }
    })
  })
}

// Add Arrows and events if the layouts are available
function getShipOrientationOptions (ship, coords, element, player) {
  if (player.Ships[ship].condition === 'deployed') {
    return
  }

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
  // Check allowed moves and give events based on what moves are allowed
  if (player.Ships[ship].moves.up.allowed) {
    element.append(up)
    up.addEventListener('click', (e) => {
      e.stopPropagation()
      placeShipOnBoard(player.Ships[ship].moves.up, element, ship, coords)
    })
  }
  if (player.Ships[ship].moves.forwards.allowed) {
    element.append(right)
    right.addEventListener('click', (e) => {
      e.stopPropagation()
      placeShipOnBoard(player.Ships[ship].moves.forwards, element, ship, coords)
    })
  }
  if (player.Ships[ship].moves.backwards.allowed) {
    element.append(left)
    left.addEventListener('click', (e) => {
      e.stopPropagation()
      placeShipOnBoard(player.Ships[ship].moves.backwards, element, ship, coords)
    })
  }
  if (player.Ships[ship].moves.down.allowed) {
    element.append(down)
    down.addEventListener('click', (e) => {
      e.stopPropagation()
      placeShipOnBoard(player.Ships[ship].moves.down, element, ship, coords)
    })
  }
}

// Arrows showing available deployment options
function placeShipOnBoard (direction, element, ship, coords) {
  const width = window.innerWidth
  console.log()
  const deploymentComplete = document.getElementById(player1.Ships[ship].name)
  deploymentComplete.style.color = 'green'
  deploymentComplete.style.borderColor = 'green'
  const parent = document.getElementById(element.id)
  const children = [...parent.childNodes]
  children.forEach(childElements => {
    childElements.remove()
  })
  const createImg = document.createElement('img')
  createImg.setAttribute('src', player1.Ships[ship].url)
  createImg.classList.add(ship)
  createImg.style.transformOrigin = direction.origin
  createImg.style.transform = `rotate(${direction.deg}deg)`
  createImg.addEventListener('click', (e) => {
    e.stopImmediatePropagation()
  })
  if ((direction.text === 'down' || direction.text === 'up') && width <= 1600) {
    createImg.style.transformOrigin = '20px'
  }
  element.append(createImg)
  GameBoard.deployShip(direction, ship, player1, coords)
  storeElements = []
}

// Must clear if they select another coord
function clearPreviousSelectedElement () {
  const parent = document.getElementById(storeElements[0])
  const children = [...parent.childNodes]
  children.forEach(childElement => {
    childElement.remove()
  })
  storeElements.shift()
}

export { DOMElements, selectShip, getShipOrientationOptions }
