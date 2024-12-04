import { Gameboard } from './GameBoard.js';

export class Player {
  constructor(name, isComputer = false) {
    this.name = name;
    this.isComputer = isComputer;
    this.gameboard = new Gameboard();
  }

  attack(opponentGameboard, coordinates) {
    return opponentGameboard.receiveAttack(coordinates);
  }

  getRandomCoordinates() {
    return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
  }
}
