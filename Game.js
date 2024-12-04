import { Player } from './Player.js';

export class Game {
  constructor() {
    this.player = new Player('Player');
    this.computer = new Player('Computer', true);
    this.currentTurn = this.player;
  }

  switchTurn() {
    this.currentTurn = this.currentTurn === this.player ? this.computer : this.player;
  }

  playTurn(coordinates) {
    const opponent = this.currentTurn === this.player ? this.computer : this.player;
    const attackSuccessful = this.currentTurn.attack(opponent.gameboard, coordinates);

    if (opponent.gameboard.allShipsSunk()) {
      console.log(`${this.currentTurn.name} wins!`);
      return true;
    }

    this.switchTurn();
    return attackSuccessful;
  }

  computerPlay() {
    if (this.currentTurn.isComputer) {
      let coordinates;
      do {
        coordinates = this.computer.getRandomCoordinates();
      } while (
        this.computer.gameboard.missedAttacks.some(([r, c]) => r === coordinates[0] && c === coordinates[1])
      );

      return this.playTurn(coordinates);
    }
  }
}
