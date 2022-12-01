import { GameBoard } from '../components/gameBoard'
import { player1, player2 } from '../components/players'
import { DOMElements } from './placeShips'

// Shows misses on the boards
function displayMiss (element) {
  const createMarker = document.createElement('div')
  createMarker.classList.add('missMarker')
  createMarker.innerHTML = 'X'
  createMarker.style.color = 'white'
  element.append(createMarker)
  if (player1.turn) {
    element.classList.add('triggered')
    DOMElements.display.textContent = 'You fired at the enemy and missed'
  }
  if (player2.turn) {
    DOMElements.display.textContent = 'The enemy has fired, but they missed!'
  }
}

// Shows Hits on the boards
function displayHit (element, ship) {
  const createMarker = document.createElement('div')
  createMarker.classList.add('hitMarker')
  createMarker.innerHTML = 'X'
  element.append(createMarker)
  if (player1.turn) {
    DOMElements.display.textContent = 'You fired at the enemy and it was a direct hit!'
    element.classList.add('triggered')
    if (player2.Ships[ship].sunk) {
      DOMElements.display.textContent = `You fired at the enemy and sunk their ${player2.Ships[ship].name}`
      const displaySink = document.getElementById(`enemy-${ship}`)
      displaySink.style.borderColor = 'red'
      const winner = GameBoard.checkWin(player2)
      if (winner) {
        player1.wins = true
      }
    }
  }
  if (player2.turn) {
    DOMElements.display.textContent = `The enemy has fired, and struck our ${player1.Ships[ship].name}`
    if (player1.Ships[ship].sunk) {
      DOMElements.display.textContent = `The enemy has fired, and sunk our ${player1.Ships[ship].name}`
      const displaySink = document.getElementById(ship)
      displaySink.style.borderColor = 'red'
      displaySink.style.color = 'red'
      const winner = GameBoard.checkWin(player1)
      if (winner) {
        player2.wins = true
      }
    }
  }
}

// Shows when all ships have been sunk
function win (player) {
  if (player.name === 'player2') {
    DOMElements.display.textContent = 'You have sunk all enemy ships'
  }
  if (player.name === 'player1') {
    DOMElements.display.textContent = 'Admiral, we have lost... We are going down'
  }
}

export { displayHit, displayMiss, win }
