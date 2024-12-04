import { Ship } from './Ship.js';

export class Gameboard {
  constructor() {
    this.board = Array(10).fill(null).map(() => Array(10).fill(null));
    this.ships = [];
    this.missedAttacks = [];
  }

  placeShip(ship, coordinates, isHorizontal = true) {
    const { length } = ship;
    const [row, col] = coordinates;

    for (let i = 0; i < length; i++) {
      const r = row + (isHorizontal ? 0 : i);
      const c = col + (isHorizontal ? i : 0);
      if (r >= 10 || c >= 10 || this.board[r][c]) throw new Error('Invalid placement');
    }

    for (let i = 0; i < length; i++) {
      const r = row + (isHorizontal ? 0 : i);
      const c = col + (isHorizontal ? i : 0);
      this.board[r][c] = ship;
    }
    this.ships.push(ship);
  }

  receiveAttack(coordinates) {
    const [row, col] = coordinates;
    const target = this.board[row][col];

    if (target === null) {
      this.missedAttacks.push(coordinates);
      return false;
    }

    target.hit();
    return true;
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}
