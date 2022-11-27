import { player1, Ships } from '../components/ships'

test('Ship Details', () => {
  expect(Ships.battleship).toStrictEqual({ name: 'Battleship', length: 4, hitPoints: 4, sunk: false, x: 0, y: 0 })
})

test('player1 gets hit', () => {
  expect(player1.hit('battleship'))
  expect(player1.battleship).toStrictEqual({ name: 'Battleship', hitPoints: 3, length: 4, sunk: false, x: 0, y: 0 })
})

test('player1 battleship Sunk', () => {
  expect(player1.hit('battleship'))
  expect(player1.hit('battleship'))
  expect(player1.hit('battleship'))
  expect(player1.hit('battleship'))
  expect(player1.hit('battleship'))
  expect(player1.battleship).toStrictEqual({ name: 'Battleship', hitPoints: 0, length: 4, sunk: true, x: 0, y: 0 })
})