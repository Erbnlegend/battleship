import { Ships } from './ships'

const player1 = {
  Ships,
  attack: function (coords) {
    console.log(`${coords} attacked`)
  }
}
const player2 = Ships

export { player1, player2 }
