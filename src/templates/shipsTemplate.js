import { DOMElements } from '../domChanges/placeShips'
import { player1 } from '../components/players'

function shipTemplate () {
  const template = `<button id="${player1.Ships.carrier.name}" class="ship" data-name="${player1.Ships.carrier.name}"></button>
  <button id="${player1.Ships.battleship.name}" class="ship" data-name="${player1.Ships.battleship.name}"></button>
  <button id="${player1.Ships.destroyer.name}" class="ship" data-name="${player1.Ships.destroyer.name}"></button>
  <button id="${player1.Ships.warship.name}" class="ship" data-name="${player1.Ships.warship.name}"></button>
  <button id="${player1.Ships.patrol.name}" class="ship" data-name="${player1.Ships.patrol.name}"></button>`

  template.trim()
  DOMElements.ships.innerHTML = template
}

export { shipTemplate }
