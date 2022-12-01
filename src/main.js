import './index.html'
import './styles/normalize.css'

import './assets/aircraftcarrierBig.svg'
import './assets/battleshipBig.svg'
import './assets/destroyerBig.svg'
import './assets/warshipBig.svg'
import './assets/patrolBig.svg'
import './assets/aircraftcarrier.svg'
import './assets/battleship.svg'
import './assets/destroyer.svg'
import './assets/warship.svg'
import './assets/patrol.svg'

import { shipTemplate } from './templates/shipsTemplate'
import { attackTemplate, boardTemplate } from './templates/board'
import { selectShip } from './domChanges/placeShips'

import './styles/style.css'

// Playing Grid
boardTemplate()
// Ship buttons
shipTemplate()
// Allows User to select a ship to place
selectShip()
// Attack and computer board
attackTemplate()
