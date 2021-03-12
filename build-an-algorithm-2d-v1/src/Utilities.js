import C from "./Constants";

const R = require('ramda');

const DIRECTIONS = [
  {row: -1, col: 0},
  {row: 0, col: 1},
  {row: +1, col: 0},
  {row: 0, col: -1},
];

const Utilities = {
  isDestinationActive: (cells, position) => {
    if (position.row < 0 ||
      position.row >= C.GRID_SIZE ||
      position.col < 0 ||
      position.col >= C.GRID_SIZE) return false;
    return cells[position.row][position.col] !== C.CELL_STATES.INACTIVE;
  },

  findNextPosition: (position, direction) => {
    return {
      row: position.row + DIRECTIONS[direction].row,
      col: position.col + DIRECTIONS[direction].col
    }
  },

  findNewDirection: (direction, turn) => {
    let dirMatrix = {
      'right': [1, 2, 3, 0],
      'left':  [3, 0, 1, 2]
    }
    return dirMatrix[turn][direction];
  },

  findCell: (levelData, position) => {
    return R.find(cell => cell.row === position.row && cell.col === position.col, levelData.cells);
  },

  areCellsAllLit: levelData => {
    return R.all(cell => cell.state !== 'shouldLite', levelData.cells);
  }
};

export default Utilities;
