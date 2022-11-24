import { player1, Ships } from '../components/ships'

test('Ship Details', () => {
  expect(Ships.battleship).toStrictEqual({ length: 4, hitPoints: 4, sunk: false })
})

test('player1', () => {
  expect(player1).toStrictEqual(
    {
      carrier: { length: 5, hitPoints: 5, sunk: false },
      battleship: { length: 4, hitPoints: 4, sunk: false },
      destroyer: { length: 3, hitPoints: 3, sunk: false },
      submarine: { length: 3, hitPoints: 3, sunk: false },
      patrol: { length: 2, hitPoints: 2, sunk: false }
    })
})
