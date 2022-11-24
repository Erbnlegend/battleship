import { DOMElements } from '../dom'

function boardTemplate () {
  initializeBoardNumber()
  function initializeBoardNumber (boardNumber = 1, boardX = 1, boardY = 1) {
    if (boardNumber <= 100) {
      const createTile = document.createElement('div')
      createTile.setAttribute('id', `t${boardNumber}`)
      createTile.setAttribute('class', 'tile')

      if (boardX === 11) {
        boardX = 1
        boardY++
      }

      createTile.setAttribute('data-coords', `{"x": ${boardX}, "y": ${boardY}}`)
      DOMElements.board.append(createTile)
      initializeBoardNumber(boardNumber + 1, boardX + 1, boardY)
    }
  }
}

export { boardTemplate }
