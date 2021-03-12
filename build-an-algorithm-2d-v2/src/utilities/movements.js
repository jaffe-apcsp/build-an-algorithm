const diffMoveMatrix = {
  north: {row: -1, col: 0},
  east:  {row: 0, col: 1},
  south: {row: 1, col: 0},
  west:  {row: 0, col: -1}
}

const turnMatrix = {
  north: {right: 'east', left: 'west'},
  east: {right: 'south', left: 'north'},
  south: {right: 'west', left: 'east'},
  west: {right: 'north', left: 'south'}
}

export const moveForward = (row, col, direction) => {
  return {
    row: row + diffMoveMatrix[direction].row,
    col: col + diffMoveMatrix[direction].col
  }
}

export const getNewDirection = (direction, turn) => {
  return turnMatrix[direction][turn];
}
