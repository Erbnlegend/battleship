import { DOMElements } from '../dom'

function boardTemplate () {
  initializeBoardNumber()
  function initializeBoardNumber (boardNumber = 0, boardX = 0, boardY = 0) {
    if (boardNumber <= 99) {
      const createTile = document.createElement('div')
      createTile.setAttribute('id', `${boardNumber}`)
      createTile.setAttribute('data-location', `${boardNumber}`)
      createTile.setAttribute('class', 'tile')
      // Make x-y restart XY Coords
      if (boardX === 10) {
        boardX = 0
        boardY++
      }

      createTile.setAttribute('data-coords', `{"x": ${boardX}, "y": ${boardY}}`)
      DOMElements.board.append(createTile)
      initializeBoardNumber(boardNumber + 1, boardX + 1, boardY)
    }
  }
}

export { boardTemplate }
