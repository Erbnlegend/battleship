import { GameBoard } from './components/gameBoard'
import { player1 } from './components/players'
import { createElement, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Check } from 'lucide'

// Stores clicked Elements for removing on different tile click
let storeElements = []

const DOMElements = {
  display: document.querySelector('#displayInfo'),
  board: document.querySelector('#board'),
  attackBoard: document.querySelector('#attackBoard'),
  ships: document.querySelector('#ships'),
  start: document.querySelector('#start')
}

DOMElements.start.addEventListener('click', () => {
  const start = GameBoard.startGame()
  if (start) {
    DOMElements.start.style.display = 'none'
    DOMElements.display.textContent = 'Fire When Ready'
    DOMElements.attackBoard.style.display = 'grid'
  }
  if (!start) {
    DOMElements.start.innerHTML = '<button>You must deploy your entire fleet</button>'
  }
})

function addConfirmChecks (e) {
  const check = createElement(Check)
  check.classList.add('confirm')
  e.target.append(check)
}

// Click Ship and run player Function
function selectShip () {
  const allShips = [...document.querySelectorAll('.ship')]
  allShips.forEach(element => {
    const name = element.dataset.name
    const matchCase = name[0].toLowerCase() + name.slice(1)
    const shipName = matchCase
    element.addEventListener('click', (e) => {
      chooseCoords(e, shipName)
    })
  })
}

// Launched from selecting a Ship to place
function chooseCoords (shipElement, ship) {
  if (player1.Ships[ship].condition === 'waiting' || player1.Ships[ship].condition === 'active' || player1.Ships[ship].condition === 'deployed') {
    return
  }
  // Set Condition so only one ship can be placed at a time
  for (const item in player1.Ships) {
    if (player1.Ships[item].condition === '') {
      player1.Ships[item].condition = 'waiting'
    }
  }
  // Set first clicked Ship to active
  player1.Ships[ship].condition = 'active'
  addConfirmChecks(shipElement)
  // shipElement.target.style.backgroundColor = 'rgba(235, 252, 2, 0.808)'
  const tiles = [...document.querySelectorAll('.tile')]
  tiles.forEach(element => {
    const getCoords = element.dataset.coords
    const coords = JSON.parse(getCoords)
    element.addEventListener('click', (e) => {
      GameBoard.determineShipOrientation(ship, coords, element, player1)
      // Stores Element if clicked
      storeElements.push(element.id)

      if (storeElements.length > 1) {
        if (player1.Ships[ship].condition === 'deployed') {
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

// Arrows showing available layouts
function placeShipOnBoard (direction, element, ship, coords) {
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
