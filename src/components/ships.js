const Ships = {
  carrier: { length: 5, hitPoints: 5, sunk: false },
  battleship: { length: 4, hitPoints: 4, sunk: false },
  destroyer: { length: 3, hitPoints: 3, sunk: false },
  submarine: { length: 3, hitPoints: 3, sunk: false },
  patrol: { length: 2, hitPoints: 2, sunk: false }
}

const player1 = Ships
const player2 = Ships

export { Ships, player1, player2 }
