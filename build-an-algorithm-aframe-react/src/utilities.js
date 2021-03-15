import C from './Constants';

const utilities = {

  rowColHeightToPosition: (row, col, height) => ({
    x: col * C.BOX_SIZE,
    y: (height - 1) * C.BOX_SIZE,
    z: row * C.BOX_SIZE
  }),

  positionToRowColHeight: position => ({
    row: position.z / C.BOX_SIZE,
    col: position.x / C.BOX_SIZE,
    height: (position.y / C.BOX_SIZE) - 1
  }),

  directionToRotation: direction => ({
    x: 0,
    y: C.DIRECTION_ROT[direction] || 0,
    z: 0
  }),

  rowColInBounds: (row, col, cells) => row >= 0 && row < cells.length && col >= 0 && col < cells[0].length,

  computeMidBezierPosition: (s, e) => ({
    x: (s.x + e.x) / 2,
    y: ((s.y + e.y) / 2) + 1,
    z: (s.z + e.z) / 2
  }),

  vectorAdd: (v1, v2) => ({
    x: v1.x + v2.x,
    y: v1.y + v2.y,
    z: v1.z + v2.z,
  }),

  vectorSubtract: (v1, v2) => ({
    x: v1.x - v2.x,
    y: v1.y - v2.y,
    z: v1.z - v2.z,
  })

};

export default utilities;

