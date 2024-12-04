import { Game } from './Game.js';

const game = new Game();
const playerBoardElement = document.getElementById('player-board');
const computerBoardElement = document.getElementById('computer-board');

function renderBoard(board, container, isPlayer = true) {
  container.innerHTML = '';
  board.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const cellElement = document.createElement('div');
      cellElement.classList.add('cell');
      if (cell && cell.hits !== undefined && isPlayer) {
        cellElement.classList.add('ship');
      }
      if (
        game.currentTurn === game.computer &&
        game.computer.gameboard.missedAttacks.some(([r, c]) => r === rowIndex && c === colIndex)
      ) {
        cellElement.classList.add('miss');
      }
      container.appendChild(cellElement);

      if (!isPlayer) {
        cellElement.addEventListener('click', () => {
          game.playTurn([rowIndex, colIndex]);
          renderGame();
          if (game.currentTurn.isComputer) game.computerPlay();
        });
      }
    });
  });
}

function renderGame() {
  renderBoard(game.player.gameboard.board, playerBoardElement);
  renderBoard(game.computer.gameboard.board, computerBoardElement, false);
}

renderGame();
